import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Product } from '../entities/product.entity';
import { ProductTypes } from '../entities/productTypes.entity';
import { DepreciationIt } from 'src/entities/depreciationIt.entity';
import { User } from 'src/entities/user.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Category, Product,ProductTypes,DepreciationIt,User])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
