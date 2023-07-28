import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageDto } from 'src/dtos/common/page.dto';
import { PageMetaDto } from 'src/dtos/common/pageMeta.dto';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { AddProductDto } from 'src/dtos/product/addProduct.dto';
import { Category } from '../../entities/category.entity';
import { Product } from 'src/entities/product.entity';
import { ProductTypes } from 'src/entities/productTypes.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private _productRepository: Repository<Product>,
    @InjectRepository(ProductTypes)
    private _productTypeRepository: Repository<ProductTypes>,
  ) {}

  async addProduct(
    userId: string,
    addProductBody: AddProductDto,
  ): Promise<Product> {
    try {
      const product = this._productRepository.create({
        ...addProductBody.invoiceDetails,
        ...addProductBody.productDetails,
        ...addProductBody.supplierDetails,
        users: {
          id: userId,
        },
      });

      const productType = await this._productTypeRepository.findOne({
        where: {
          id: addProductBody.productTypeId,
        },
      });
      product.productType = productType;
      await this._productRepository.save(product);
      return product;
    } catch (error) {
      // console.log(error);
      throw new HttpException(
        'There was error adding product',
        HttpStatus.CONFLICT,
      );
    }
  }

  async updateProduct(
    productId: string,
    productBody: AddProductDto,
  ): Promise<Product> {
    try {
      const productType = await this._productTypeRepository.findOne({
        where: {
          id: productBody.productTypeId,
        },
      });
      const product = {
        ...productBody.invoiceDetails,
        ...productBody.productDetails,
        ...productBody.supplierDetails,
        productType: productType,
      };

      await this._productRepository.update(productId, product);

      const updatedProduct = await this._productRepository.findOne({
        where: { id: productId },
      });
      return updatedProduct;
    } catch (error) {
      throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
    }
  }

  async getProducts(
    userId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const queryBuilder =
        this._productRepository.createQueryBuilder('product');
      queryBuilder
        .orderBy('product.created_at', pageOptionsDto.order)
        .where('product.productName like :productName', {
          productName: `%${pageOptionsDto.search}%`,
        })
        .andWhere('product.usersId = :userId', { userId })
        .leftJoinAndSelect('product.productType', 'product_types')
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

  async getProductDetailsById(productId: string): Promise<Product> {
    try {
      const product = await this._productRepository.findOne({
        where: {
          id: productId,
        },
        relations: {
          productType: {
            category: true,
          },
        },
      });

      return product;
    } catch (e) {
      throw new HttpException(
        'Not able to get product by id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteProduct(productId: string): Promise<{ message: string }> {
    try {
      const product = await this._productRepository.find({
        where: {
          id: productId,
        },
        relations: ['productType'],
      });
      //using remove instead of delete so that event listnere gets triggered
      await this._productRepository.remove(product);
      return { message: 'Product deleted successfully' };
    } catch (e) {
      throw new HttpException('Not valid id', HttpStatus.CONFLICT);
    }
  }
}
