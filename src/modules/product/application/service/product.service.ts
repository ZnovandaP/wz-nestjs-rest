import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '@product/domain/dto/create-product.dto';
import { UpdateProductDto } from '@product/domain/dto/update-product.dto';
import { ProductsRepository } from '@product/repository/products.repository';
import { generateProductId } from '@shared/utils/generated-id';
import { JwtPayload } from '@shared/types/jwt-payload.interface';
import { AuthRepository } from '@auth/repository/auth.repository';
import { ProductsServiceException } from '../helper/product-service-exception.provider';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private authRepository: AuthRepository,
    private productsServiceException: ProductsServiceException,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async createProduct(createProductDto: CreateProductDto, payload: JwtPayload) {
    await this.productsServiceException.validateProductDuplicateByName(
      createProductDto.name,
    );

    const user = await this.authRepository.findByEmail(payload.email);

    const product = await this.productsRepository.save({
      productCode: generateProductId(),
      description: createProductDto.description.trim(),
      name: createProductDto.name.trim(),
      user: user,
      ...createProductDto,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, user: owner, ...dataProduct } = product;

    return {
      status: 'Success',
      code: 201,
      message: `Product ${createProductDto.name} has been created`,
      data: { dataProduct },
    };
  }

  async getProducts() {
    const products = await this.productsRepository.findAll();

    return {
      status: 'Success',
      message: 'Data products success to retrieved',
      data: {
        products,
      },
    };
  }

  async getProduct(productCode: string) {
    const productAfterValidation =
      await this.productsServiceException.validationBeforeManipulate(
        productCode,
        '',
      );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, user, ...dataProduct } = productAfterValidation;

    const product = { ...dataProduct, owner: user };

    return {
      status: 'Success',
      code: 200,
      message: 'Data product by product code success to retrieved',
      data: {
        product,
      },
    };
  }

  async updateProduct({
    productCode,
    updateProductDto,
    userCode,
  }: {
    productCode: string;
    updateProductDto: UpdateProductDto;
    userCode: string;
  }) {
    await this.productsServiceException.validationBeforeManipulate(
      productCode,
      userCode,
    );

    await this.productsRepository.update(productCode, {
      updatedAt: new Date(),
      ...updateProductDto,
    });

    return {
      status: 'Success',
      code: 200,
      message: `Data product with product code ${productCode} success to be change`,
    };
  }

  async deleteProduct(productCode: string, userCode: string) {
    await this.productsServiceException.validationBeforeManipulate(
      productCode,
      userCode,
    );

    await this.productsRepository.delete(productCode);

    return {
      status: 'Success',
      code: 200,
      message: `Data product with product code ${productCode} has been deleted`,
    };
  }

  /* implementasi cache management dengan case hit resource ke third party app */
  async getProductsThirdParty() {
    const productCache = await this.cacheManager.get('products');
    if (productCache) {
      console.log('Get data from cache');
      return this.responseSuccessDataProducts({ products: productCache });
    }

    const res = await fetch('https://api.escuelajs.co/api/v1/products');
    const data = await res.json();

    if (data.statusCode === 404) {
      throw new NotFoundException('Data Products Not Found');
    }

    await this.cacheManager.set('products', data, 60 * 1000);

    return this.responseSuccessDataProducts({ products: data });
  }

  responseSuccessDataProducts(data: any) {
    return {
      status: 'Success',
      message: 'Data products success to retrieved',
      data,
    };
  }
}
