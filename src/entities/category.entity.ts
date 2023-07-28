import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AbstractEntity } from './abstractEntity.entity';
import { Product } from './product.entity';
import { ProductTypes } from './productTypes.entity';
import { User } from './user.entity';

@Entity({ name: 'category' })
export class Category extends AbstractEntity {
  @Column({ name: 'category_name', unique: true, nullable: false })
  name: string;

  @OneToMany(() => ProductTypes, (productTypes) => productTypes.category)
  productTypes: ProductTypes[];

  @ManyToOne(() => User, (user) => user.categories, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  users: User;
}
