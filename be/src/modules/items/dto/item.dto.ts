// src/items/dto/create-item.dto.
import { Transform } from '@nestjs/class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsUrl
} from '@nestjs/class-validator';
import { Type } from 'class-transformer';

export class ItemDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Transform(({ value }) => (typeof value === 'string' ? value : ''))
  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @Transform(({ value }) => {
    const numberValue = Number(value);
    if (isNaN(numberValue)) {
      throw new Error('Invalid number provided for stock');
    }
    return numberValue;
  })
  @Type(() => Number)
  @IsNumber()
  stock: number;

  // @IsDateString()
  // @IsOptional()
  // dateAdded?: string;
}

export class ItemQuery {
  @Transform(({ value }) => Number(value === undefined ? 1 : value))
  @Type(() => Number)
  @IsNumber()
  page: number;

  @Transform(({ value }) => Number(value === undefined ? 10 : value))
  @Type(() => Number)
  @IsNumber()
  size: number;
}
