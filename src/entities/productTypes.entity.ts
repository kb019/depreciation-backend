import { Category } from '../entities/category.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstractEntity.entity';
import { DepreciationIt } from './depreciationIt.entity';
import { Product } from './product.entity';
import { User } from './user.entity';

@Entity({ name: 'product_types' })
export class ProductTypes extends AbstractEntity {
  @Column({ nullable: false, unique: true })
  productType: string;

  @ManyToOne(() => Category, (category) => category.productTypes, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => User, (user) => user.productTypes, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  users: User;

  @OneToMany(
    () => DepreciationIt,
    (depreciationIt) => depreciationIt.productType,
  )
  depreciationItValues: DepreciationIt[];

  @OneToMany(() => Product, (product) => product.productType)
  product: Product;
}
