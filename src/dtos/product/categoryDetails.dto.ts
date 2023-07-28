import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDetailsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: string;
}
