import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from './abstractEntity.entity';
import { ProductTypes } from './productTypes.entity';
import { User } from './user.entity';

@Entity({ name: 'depreciation_it', schema: 'public' })
export class DepreciationIt extends AbstractEntity {
  @Column()
  depYear: number;

  @Column({ default: null })
  depreciationRate: string;

  @ManyToOne(
    () => ProductTypes,
    (productTypes) => productTypes.depreciationItValues,
    { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
  )
  @JoinColumn()
  productType: ProductTypes;

  @ManyToOne(() => User, (user) => user.depItRates, {
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  users: User;
}
