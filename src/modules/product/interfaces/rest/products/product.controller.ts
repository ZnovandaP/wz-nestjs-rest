import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductsService } from '@product/application/service/product.service';
import { CreateProductDto } from '@product/domain/dto/create-product.dto';
import { UpdateProductDto } from '@product/domain/dto/update-product.dto';
import { JwtGuard } from '@/modules/auth/infrastructure/guard/jwt.guard';
import { JwtPayload } from '@shared/types/jwt-payload.interface';
import { ApiHeaders, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from '@product/domain/entities/product.entity';
import { MockResponseProductSuccess } from '@/shared/mock/response/product/product.mock';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer [ACCESS_TOKEN]',
      required: true,
      example: 'Bearer [ACCESS_TOKEN]',
    },
  ])
  @ApiResponse({
    status: 201,
    type: Product,
    description: 'Add new data product',
    example: MockResponseProductSuccess.mockResAddProduct(),
  })
  addProduct(
    @Body() createProductDto: CreateProductDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.productsService.createProduct(createProductDto, req.user);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Get all data products',
    example: MockResponseProductSuccess.mockResGetProducts(),
  })
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get(':productCode')
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Get data product by product code',
    example: MockResponseProductSuccess.mockResGetProduct(),
  })
  @ApiParam({
    name: 'productCode',
    description: 'Product productCode param',
    example: 'prd-292jdh31',
  })
  getProduct(@Param('productCode') productCode: string) {
    return this.productsService.getProduct(productCode);
  }

  @Patch(':productCode')
  @UseGuards(JwtGuard)
  @ApiParam({
    name: 'productCode',
    description: 'Product productCode param',
    example: 'prd-292jdh31',
  })
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer [ACCESS_TOKEN]',
      required: true,
      example: 'Bearer [ACCESS_TOKEN]',
    },
  ])
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Update data product',
    example: MockResponseProductSuccess.mockResUpdateProduct(),
  })
  updateProduct(
    @Param('productCode') productCode: string,
    @Body() updateProductDto: UpdateProductDto,
    @Request() req: { user: JwtPayload },
  ) {
    return this.productsService.updateProduct({
      productCode: productCode,
      updateProductDto,
      userCode: req.user.userCode,
    });
  }

  @Delete(':productCode')
  @UseGuards(JwtGuard)
  @ApiHeaders([
    {
      name: 'Authorization',
      description: 'Bearer [ACCESS_TOKEN]',
      required: true,
      example: 'Bearer [ACCESS_TOKEN]',
    },
  ])
  @ApiParam({
    name: 'productCode',
    description: 'Product productCode param',
    example: 'prd-292jdh31',
  })
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Update data product',
    example: MockResponseProductSuccess.mockResDeleteProduct(),
  })
  deleteProduct(
    @Param('productCode') productCode: string,
    @Request() req: { user: JwtPayload },
  ) {
    return this.productsService.deleteProduct(productCode, req.user.userCode);
  }

  @Get('caching/demo')
  // @UseInterceptors(CacheInterceptor)
  getProductsThirdPartyDemo() {
    return this.productsService.getProductsThirdParty();
  }
}
