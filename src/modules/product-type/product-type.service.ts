import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/dtos/common/page.dto';
import { PageMetaDto } from 'src/dtos/common/pageMeta.dto';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { AddProductTypeDto } from 'src/dtos/productType/addProductType.dto';
import { Category } from '../../entities/category.entity';
import { ProductTypes } from 'src/entities/productTypes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductTypeService {
  constructor(
    @InjectRepository(ProductTypes)
    private _productTypeRepository: Repository<ProductTypes>,
    @InjectRepository(Category) private _categoryRepository,
  ) {}

  async addProductType(
    userId: string,
    productTypeInfo: AddProductTypeDto,
  ): Promise<ProductTypes> {
    try {
      const productType = this._productTypeRepository.create({
        productType: productTypeInfo.productType,
        users: {
          id: userId,
        },
      });

      const category = await this._categoryRepository.findOne({
        where: {
          id: productTypeInfo.categoryId,
        },
      });
      productType.category = category;

      await this._productTypeRepository.save(productType);
      return productType;
    } catch (error) {
      // console.log(error);
      throw new HttpException(
        'There was error adding product',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAllProductTypes(
    userId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ProductTypes>> {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const queryBuilder =
        this._productTypeRepository.createQueryBuilder('product_types');
      queryBuilder
        .leftJoinAndSelect(
          'product_types.depreciationItValues',
          'depreaction_it',
          'depreciationRate IS NULL',
        )
        .orderBy('product_types.created_at', pageOptionsDto.order)
        .where('product_types.productType like :productType', {
          productType: `%${pageOptionsDto.search}%`,
        })
        .andWhere('product_types.usersId = :userId', { userId })
        .leftJoinAndSelect('product_types.category', 'category')
        .skip(skip)
        .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Not able to get products',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updateProductType(
    productTypeId: string,
    updateproductInfoBody: AddProductTypeDto,
  ): Promise<ProductTypes> {
    try {
      const category = await this._categoryRepository.findOne({
        where: {
          id: updateproductInfoBody.categoryId,
        },
      });
      const productTypeInfo = {
        productType: updateproductInfoBody.productType,
        category: category,
      };

      await this._productTypeRepository.update(productTypeId, productTypeInfo);

      const updatedProduct = await this._productTypeRepository.findOne({
        where: { id: productTypeId },
      });
      return updatedProduct;
    } catch (error) {
      throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
    }
  }

  async deleteProductType(productTypeId: string): Promise<{ message: string }> {
    try {
      await this._productTypeRepository.delete(productTypeId);
      return { message: 'Product Type deleted successfully' };
    } catch (e) {
      throw new HttpException('Not valid id', HttpStatus.CONFLICT);
    }
  }

  async getProductTypesWithoutPagination(
    userId: string,
  ): Promise<ProductTypes[]> {
    try {
      return this._productTypeRepository.find({
        where: {
          users: {
            id: userId,
          },
        },
      });
    } catch (e) {
      new HttpException('Unable to get productTypes', HttpStatus.BAD_REQUEST);
    }
  }
}
