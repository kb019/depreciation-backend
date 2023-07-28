import {
  Column,
  Entity,
  ManyToOne,
  AfterInsert,
  getConnection,
  getRepository,
  JoinColumn,
} from 'typeorm';
import { AbstractEntity } from './abstractEntity.entity';
import { Category } from './category.entity';
import { ProductTypes } from './productTypes.entity';
import { DepreciationIt } from './depreciationIt.entity';
import { User } from './user.entity';

@Entity({ name: 'product', schema: 'public' })
export class Product extends AbstractEntity {
  @Column({ name: 'product_name', nullable: false })
  productName: string;

  @Column({ name: 'quantity', nullable: false })
  quantity: string;

  @Column({ name: 'cgst', nullable: false })
  cgst: string;

  @Column({ name: 'sgst', nullable: false })
  sgst: string;

  @Column({ name: 'price', nullable: false })
  price: string;

  @Column({ name: 'purchase_date', nullable: false })
  purchaseDate: Date;

  @Column({ name: 'invoice_number', nullable: false })
  invoiceNumber: string;

  @Column({ name: 'invoice_date', nullable: false })
  invoiceDate: Date;

  @Column({ name: 'supplier_name', nullable: false })
  supplierName: string;

  @Column({ name: 'supplier_address', nullable: false })
  supplierAddress: string;

  @ManyToOne(() => ProductTypes, (productTypes) => productTypes.product, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  productType: ProductTypes;

  @ManyToOne(() => User, (user) => user.products, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  users: User;
}
