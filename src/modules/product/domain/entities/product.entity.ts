import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '@auth/domain/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1, description: 'Product id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'prd-292jdh31', description: 'Product code' })
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    name: 'product_code',
  })
  productCode: string;

  @ApiProperty({ example: 'product 1', description: 'Product name' })
  @Column({
    type: 'varchar',
    length: 255,
  })
  name: string;

  @ApiProperty({
    example: 'product description',
    description: 'Product description',
  })
  @Column({
    type: 'text',
  })
  description: string;

  @ApiProperty({ example: 2000, description: 'Product price' })
  @Column({
    type: 'integer',
    default: 0,
  })
  price: number;

  @ApiProperty({ example: 20, description: 'Product stock' })
  @Column({
    type: 'integer',
    default: 0,
  })
  stock: number;

  @ApiProperty({
    example: '2024-08-13T19:26:39.381Z',
    description: 'Product created at',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-13T19:26:39.381Z',
    description: 'Product updated at',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'User Entity',
    description: 'Product updated at',
    type: User,
  })
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
