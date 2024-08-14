import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '@product/domain/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ example: 1, description: 'user id' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'usr-23djda22', description: 'user code' })
  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
    name: 'user_code',
  })
  userCode: string;

  @ApiProperty({ example: 'user_12@mail.id', description: 'user email' })
  @Column({
    unique: true,
    length: 150,
    nullable: false,
    type: 'varchar',
  })
  email: string;

  @ApiProperty({ example: 'hash_password', description: 'user password' })
  @Column({
    nullable: false,
  })
  password: string;

  @ApiProperty({ example: 'common | admin | master', description: 'user role' })
  @Column({
    type: 'varchar',
    length: 50,
    enum: ['admin', 'common', 'master'],
    enumName: 'role',
    default: 'common',
  })
  role: string;

  @ApiProperty({ example: 'url_avatar', description: 'user avatar' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  avatar: string;

  @ApiProperty({
    example: '2024-08-13T19:26:39.381Z',
    description: 'user created at',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-08-13T19:26:39.381Z',
    description: 'user created at',
  })
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'updated_at',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'products_collection',
    description: 'Product collection that belong to this user',
  })
  @OneToMany(() => Product, (product) => product.user)
  products: Product[];
}
