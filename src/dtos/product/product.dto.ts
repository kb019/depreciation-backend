import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';


export class ProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  productName: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  purchaseDate: Date;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  quantity: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  price: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cgst: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  sgst: string;


}
