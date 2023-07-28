import {
  EventSubscriber,
  EntitySubscriberInterface,
  InsertEvent,
  RemoveEvent,
} from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { DepreciationIt } from 'src/entities/depreciationIt.entity';

@EventSubscriber()
export class productSubscriber implements EntitySubscriberInterface<Product> {
  // Denotes that this subscriber only listens to Trip Entity
  listenTo() {
    return Product;
  }

  // Called after entity insertion
  async afterInsert(event: InsertEvent<Product>) {
    // console.log(`AFTER ENTITY INSERTED: `, event.entity.users.id, event.entity);

    const depItRepo = await event.manager.getRepository(DepreciationIt);
    const productRepo = await event.manager.getRepository(Product);
    //select max purchase date for this product type
    // const [maxYearProductEntity] = await productRepo.find({
    //   where: {
    //     productType: {
    //       id: event.entity.productType.id,
    //     },
    //   },
    //   order: {
    //     purchaseDate: 'DESC',
    //   },
    //   take: 1,
    // });
    //select minimum purchase date for this product Type
    const [minYearProductEntity] = await productRepo.find({
      where: {
        productType: {
          id: event.entity.productType.id,
        },
      },
      order: {
        purchaseDate: 'ASC',
      },
      take: 1,
    });

    // console.log(maxYearProductEntity, minYearProductEntity);

    const startYear = minYearProductEntity.purchaseDate.getFullYear();
    const endYear = new Date().getFullYear();

    //add all the years between min_purchasedate and max purchase date for product in depreciation It Table for this product Type
    for (let i = startYear; i <= endYear; i++) {
      const depIt = new DepreciationIt();
      const depItRow = await depItRepo.findOne({
        where: {
          depYear: i,
          productType: {
            id: event.entity.productType.id,
          },
        },
      });
      //   console.log(depItRow);
      if (depItRow != null) continue;
      depIt.depYear = i;
      depIt.users = event.entity.users;
      depIt.productType = event.entity.productType;
      await depItRepo.save(depIt);
    }
  }

  async afterRemove(event: RemoveEvent<Product>) {
    // console.log(`AFTER ENTITY delete: `, event.entity);

    const depItRepo = await event.manager.getRepository(DepreciationIt);

    const productRepo = await event.manager.getRepository(Product);
    //select the minimum purchase date for this product type in product after delete of this product type occurs
    const [minYearProductEntity] = await productRepo.find({
      where: {
        productType: {
          id: event.entity.productType.id,
        },
      },
      order: {
        purchaseDate: 'ASC',
      },
      take: 1,
    });

    // console.log(minYearProductEntity);
    //onlu if there is a product type with minYear(i.e min Purchase_date) with this productType,then execute delete
    if (minYearProductEntity) {
      //delete all years below min purchase date for this product type deprection_it table
      await depItRepo
        .createQueryBuilder('depreciation_it')
        .delete()
        .where('depreciation_it.depYear < :minYear', {
          minYear: minYearProductEntity.purchaseDate.getFullYear(),
        })
        .andWhere('depreciation_it.productTypeId = :id', {
          id: event.entity.productType.id,
        })
        .execute();
    } else {
      // delette depricates rates for all years of this product Type if there is no product for this type
      await depItRepo
        .createQueryBuilder('depreciation_it')
        .delete()
        .where('depreciation_it.productTypeId = :id', {
          id: event.entity.productType.id,
        })
        .execute();
    }
  }
}
