import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '@product/domain/dto/create-product.dto';
import { UpdateProductDto } from '@product/domain/dto/update-product.dto';
import { ProductsRepository } from '@product/repository/products.repository';
import { generateProductId } from '@shared/utils/generated-id';
import { JwtPayload } from '@shared/types/jwt-payload.interface';
import { AuthRepository } from '@auth/repository/auth.repository';
import { ProductsServiceException } from '../helper/service-exception.provider';

@Injectable()
export class ProductsService {
  constructor(
    private productsRepository: ProductsRepository,
    private authRepository: AuthRepository,
    private productsServiceException: ProductsServiceException,
  ) {}
  async createProduct(createProductDto: CreateProductDto, payload: JwtPayload) {
    await this.productsServiceException.errorProductDuplicateByName(
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

    delete product.user;
    delete product.id;

    return {
      status: 'Success',
      code: 201,
      message: `Product ${createProductDto.name} has been created`,
      data: { product },
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

  async getProdcut(productCode: string) {
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
}
