import { PageDto } from './../../dtos/common/page.dto';
import { PageOptionsDto } from './../../dtos/common/pageOptions.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageMetaDto } from 'src/dtos/common/pageMeta.dto';
import { UpdateDepreciationItDto } from 'src/dtos/depreciation-it/updateDepreciationIt.dto';
import { DepreciationIt } from 'src/entities/depreciationIt.entity';
import { ProductTypes } from 'src/entities/productTypes.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class DepreciationItService {
  constructor(
    @InjectRepository(DepreciationIt)
    private _depRepo: Repository<DepreciationIt>,
    @InjectRepository(ProductTypes)
    private _productTypeRepo: Repository<ProductTypes>,
  ) {}

  async getAllRates(
    userId: string,
    pageOptionDto: PageOptionsDto,
  ): Promise<PageDto<ProductTypes>> {
    try {
      const skip = (pageOptionDto.page - 1) * pageOptionDto.take;
      const queryBuilder =
        this._productTypeRepo.createQueryBuilder('product_types');
      queryBuilder
        .where('product_types.usersId = :userId', { userId })
        .leftJoinAndSelect(
          'product_types.depreciationItValues',
          'depreciation_it',
          'depreciation_it.depreciationRate IS NULL',
        )
        .orderBy('product_types.created_at', pageOptionDto.order)
        .where('product_types.productType like :productTypeName', {
          productTypeName: `%${pageOptionDto.search}%`,
        })
        .skip(skip)
        .take(pageOptionDto.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptionsDto: pageOptionDto,
      });

      return new PageDto(entities, pageMetaDto);
    } catch (e) {
      new HttpException(
        'Unable to get Depreciation Rates',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getRatesByProductType(
    productTypeId: string,
    pageOptionDto: PageOptionsDto,
  ): Promise<PageDto<DepreciationIt>> {
    try {
      const skip = (pageOptionDto.page - 1) * pageOptionDto.take;
      const queryBuilder = this._depRepo.createQueryBuilder('depreciation_it');
      queryBuilder
        .orderBy('depreciation_it.depYear', 'ASC')
        .where('depreciation_it.productTypeId = :id', { id: productTypeId })
        .andWhere('depreciation_it.depYear like :year', {
          year: `%${pageOptionDto.search}%`,
        })
        .skip(skip)
        .take(pageOptionDto.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptionsDto: pageOptionDto,
      });

      return new PageDto(entities, pageMetaDto);
    } catch (e) {
      new HttpException(
        'Unable to get Depreciation Rates',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateDepreciationRate(
    depreciationItId: string,
    updateDepreciationItInfo: UpdateDepreciationItDto,
  ): Promise<DepreciationIt> {
    try {
      const depRateInfo = {
        depreciationRate: String(updateDepreciationItInfo.depRate),
      };

      await this._depRepo.update(depreciationItId, depRateInfo);

      const updatedDepreciation = await this._depRepo.findOne({
        where: { id: depreciationItId },
      });
      return updatedDepreciation;
    } catch (error) {
      throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
    }
  }
}
