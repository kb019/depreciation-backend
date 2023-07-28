import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from './abstractEntity.entity';
import { Category } from './category.entity';
import { ProductTypes } from './productTypes.entity';
import { Product } from './product.entity';
import { DepreciationIt } from './depreciationIt.entity';

@Entity({ name: 'user' })
export class User extends AbstractEntity {
  @Column({ name: 'companyName', nullable: false })
  companyName: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'address', nullable: false })
  address: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @Column({ name: 'refreshToken', default: '' })
  refreshToken: string;

  @OneToMany(() => Category, (category) => category.users)
  categories: Category[];

  @OneToMany(() => ProductTypes, (productTypes) => productTypes.users)
  productTypes: ProductTypes[];

  @OneToMany(() => Product, (product) => product.users)
  products: Product;

 @OneToMany(()=>DepreciationIt,(depreciationIt)=>depreciationIt.users)
 depItRates:DepreciationIt[]
}
