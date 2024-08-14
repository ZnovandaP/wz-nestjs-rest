import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../domain/entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async findAll() {
    return await this.productRepository.find({
      select: {
        name: true,
        description: true,
        price: true,
        productCode: true,
        stock: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async findByCode(code: string) {
    return await this.productRepository.findOne({
      select: {
        user: {
          email: true,
          userCode: true,
          avatar: true,
        },
      },
      where: {
        productCode: code,
      },
      relations: {
        user: true,
      },
    });
  }

  async findByName(name: string) {
    return await this.productRepository.findOne({
      where: { name },
    });
  }

  async save(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    return await this.productRepository.save(product);
  }

  async update(
    productCode: string,
    product: Partial<Omit<Product, 'id' | 'createdAt'>>,
  ) {
    return await this.productRepository.update(
      {
        productCode: productCode,
      },
      product,
    );
  }

  async delete(code: string) {
    return await this.productRepository.delete({ productCode: code });
  }
}
