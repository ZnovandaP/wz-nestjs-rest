import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsInt,
  MaxLength,
  IsNotEmpty,
  Min,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  @MinLength(3)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  price: number;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  @Min(0)
  stock: number;
}
