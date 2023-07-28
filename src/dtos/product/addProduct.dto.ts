import { ApiProperty } from '@nestjs/swagger';
import { InvoiceDto } from './invoice.dto';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { SupplierDto } from './supplier.dto';
import { ProductDto } from './product.dto';
import { CategoryDetailsDto } from './categoryDetails.dto';

export class AddProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  productTypeId: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => InvoiceDto)
  invoiceDetails: InvoiceDto;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => SupplierDto)
  supplierDetails: SupplierDto;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  productDetails: ProductDto;
}
