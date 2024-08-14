import { PartialType } from '@nestjs/mapped-types';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  price?: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  @IsNotEmpty()
  stock?: number;
}
