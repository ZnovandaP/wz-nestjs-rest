import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsService } from './application/service/product.service';
import { ProductsController } from './interfaces/rest/products/product.controller';
import { Product } from './domain/entities/product.entity';
import { ProductsRepository } from './repository/products.repository';
import { AuthModule } from '../auth/auth.module';
import { ProductsServiceException } from './application/helper/product-service-exception.provider';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, ProductsServiceException],
  exports: [ProductsRepository],
})
export class ProductsModule {}
