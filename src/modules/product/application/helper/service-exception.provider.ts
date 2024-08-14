import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductsRepository } from '../../repository/products.repository';

@Injectable()
export class ProductsServiceException {
  constructor(private productsRepository: ProductsRepository) {}

  async errorProductDuplicateByName(name: string) {
    const product = await this.productsRepository.findByName(name);
    if (product) {
      throw new BadRequestException(
        `Data product with name ${name} is already exist!`,
      );
    }
  }

  async validationBeforeManipulate(productCode: string, userCode: string) {
    const productByCode = await this.productsRepository.findByCode(productCode);

    if (!productByCode)
      throw new NotFoundException(
        `Data product with ${productCode} not found!`,
      );

    if (
      userCode &&
      productByCode.user.userCode.toLowerCase() !== userCode.toLowerCase()
    ) {
      console.log(userCode);
      throw new ForbiddenException(
        'You are not allowed to manipulate this product!',
      );
    }

    return productByCode;
  }
}
