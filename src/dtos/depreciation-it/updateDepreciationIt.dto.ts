import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateDepreciationItDto {


  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  depRate: number;

 
}
