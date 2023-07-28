import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DepreciationIt } from 'src/entities/depreciationIt.entity';
import { Product } from 'src/entities/product.entity';
import { ProductTypes } from 'src/entities/productTypes.entity';
import { Repository, IsNull, LessThanOrEqual, Unique } from 'typeorm';
import { ItTableDataDto } from 'src/dtos/schedule/ItTableData.dto';
import { ItDbResponseDto } from 'src/dtos/schedule/itDbResponseData.dto';
import { ItProductTypeRecorsDto } from 'src/dtos/schedule/itProductTypeRecors.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(DepreciationIt)
    private _depRepo: Repository<DepreciationIt>,
    @InjectRepository(ProductTypes)
    private _productTypeRepo: Repository<ProductTypes>,
  ) {}

  mapItemsToProductType(records: ItDbResponseDto[], categoryMap) {
    const map = {};

    for (let i = 0; i < records.length; i++) {
      const item = records[i];
      //add the category in the map,with categoryName set to its name and empty dependent array
      categoryMap[item.category_category_name] = {
        categoryName: item.category_category_name,
        data: [],
      };

      //get the necessary details from record
      const itemDetails = {
        depYear: item.depYear,
        depRate: item.depreciationRate ? +item.depreciationRate / 100 : 0,
        nextYearbefore180DaysAmount: item.nextYearBefore180Days || 0,
        nextYearAfter180DaysAmount: item.nextYearAfter180Days || 0,
        curYearAfter180Days: item.curYearAfter180Days || 0,
      };
      //if there is  product Type already,then add the necessary details to the data property of product type
      if (map[item.pt_productType] != undefined) {
        const arr = map[item.pt_productType].data;
        arr.push(itemDetails);
        map[item.pt_productType].data = arr;
      } else {
        //if there is no product type,then get add the product Type,with the categoryName and data property to map
        map[item.pt_productType] = {
          category: item.category_category_name,
          data: [itemDetails],
        };
      }
    }
    return map;
  }

  generateDepData(records: ItProductTypeRecorsDto[]) {
    let wdvend = 0;
    const n = records.length;

    for (let i = 0; i < records.length; i++) {
      const record = records[i];
      let wdvstart = wdvend;
      wdvstart < 0 ? (wdvstart = 0) : '';
      const depRate = record.depRate;
      const before180Days =
        i > 0 ? records[i - 1].nextYearbefore180DaysAmount : 0;
      const after180Days =
        i > 0
          ? records[i - 1].nextYearAfter180DaysAmount +
            record.curYearAfter180Days
          : record.curYearAfter180Days;
      const total = wdvstart + before180Days + after180Days;
      const depForYear = Math.round(
        (wdvstart + before180Days) * depRate + (after180Days * depRate) / 2,
      );
      if (i == n - 1) {
        //mean this product has already been replinished or not there for this year
        if (total - depForYear == 0 && total == 0) return null;
        return {
          rateOfDepn: depRate,
          wdvstart: wdvend,
          before180Days: before180Days,
          after180Days: after180Days,
          total: total,
          depForYear: depForYear,
          wdvend: total - depForYear,
        };
      }
      wdvend = total - depForYear;
    }
    return null;
  }

  async generateSchedule(userId: string, year: string) {
    const query1 = this._productTypeRepo
      .createQueryBuilder('pt')
      .leftJoinAndMapMany(
        'pt.itValues',
        (subQuery) =>
          subQuery
            .select([
              'depIt.*',
              'productAlias.nextYearBefore180Days',
              'productAlias.nextYearAfter180Days',
              'productAlias.curYearAfter180Days',
            ])
            .from(DepreciationIt, 'depIt')
            .where('depIt.depYear <= :givenyear', { givenyear: year })
            .leftJoin(
              (subQuery) =>
                subQuery
                  .select([
                    'p.productTypeId',
                    'SUM(CASE WHEN QUARTER(purchase_date) IN (2,3) THEN price * quantity ELSE 0 END) AS nextYearBefore180Days',
                    'SUM(CASE WHEN QUARTER(purchase_date) IN (4) THEN price * quantity ELSE 0 END) AS nextYearAfter180Days',
                    'SUM(CASE WHEN QUARTER(purchase_date) IN (1) THEN price * quantity ELSE 0 END) AS curYearAfter180Days',
                    'SUM(price * quantity) AS totalPrice',
                    'YEAR(purchase_date) AS purchase_year',
                  ])
                  .from(Product, 'p')
                  .where('p.usersId = :userId', { userId })
                  .groupBy('p.productTypeId')
                  .addGroupBy('YEAR(p.purchase_date)'),
              'productAlias',
              'productAlias.purchase_year = depIt.depYear AND productAlias.productTypeId = depIt.productTypeId',
            ),

        'depIt',
        'pt.id=depIt.productTypeId',
      )
      .leftJoinAndSelect('pt.category', 'category')
      .orderBy('depIt.productTypeId, depIt.depYear');

    const res: ItDbResponseDto[] = await query1.getRawMany();
    // return res;
    const categoryMap = {};
    //this is to map products to productTypes
    const map = this.mapItemsToProductType(res, categoryMap);
    // return map;
    for (const key in map) {
      const generatedDepData = this.generateDepData(map[key].data);
      //this is to keep all the productTypes for a given category in one place
      if (generatedDepData != null) {
        generatedDepData['productType'] = key;
        categoryMap[map[key].category].data.push(generatedDepData);
      }
    }

    const depArr: ItTableDataDto[] = [];
    //push key key to depArr
    for (const key in categoryMap) {
      //push the category only if there are any data items
      if (categoryMap[key].data.length > 0) {
        const meta = {
          total_wdvstart: 0,
          total_before180Days: 0,
          total_after180Days: 0,
          total_total: 0,
          total_depForYear: 0,
          total_wdvend: 0,
        };
        const categoryData = categoryMap[key].data;
        for (let i = 0; i < categoryData.length; i++) {
          meta.total_wdvstart += categoryData[i].wdvstart;
          meta.total_before180Days += categoryData[i].before180Days;
          meta.total_after180Days += categoryData[i].after180Days;
          meta.total_total += categoryData[i].total;
          meta.total_depForYear += categoryData[i].depForYear;
          meta.total_wdvend += categoryData[i].wdvend;
        }
        categoryMap[key]['meta'] = meta;
        depArr.push(categoryMap[key]);
      }
    }

    return depArr;
  }

  async checkRatesFilledForYear(userId: string, year: string) {
    const recordsWithUnfilledRates = await this._depRepo.find({
      where: {
        depreciationRate: IsNull(),
        depYear: LessThanOrEqual(+year),
        users: {
          id: userId,
        },
      },
    });
    return recordsWithUnfilledRates;
  }

  @Cron('0 0 1 1 *')
  async handleCron() {
    //get all productTypes id present in depreciation table to add depreaciation rate for each year
    const uniqueProductTypeIds: { productTypeId: string; usersId: string }[] =
      await this._depRepo
        .createQueryBuilder()
        .select('productTypeId')
        .distinct(true)
        .addSelect('usersId')
        .getRawMany();

    // console.log(uniqueProductTypeIds);
    for (let i = 0; i < uniqueProductTypeIds.length; i++) {
      const productTypeId = uniqueProductTypeIds[i].productTypeId;
      const userId = uniqueProductTypeIds[i].usersId;
      await this._depRepo
        .createQueryBuilder()
        .insert()
        .into(DepreciationIt)
        .values({
          depYear: new Date().getFullYear(),
          productType: {
            id: productTypeId,
          },
          users: {
            id: userId,
          },
        })
        .execute();
      // console.log('finished');
    }
  }
}
