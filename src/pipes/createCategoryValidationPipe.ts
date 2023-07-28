import { ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dtos/category/createCategory.dto';

@Injectable()
export class CreateCategoryValidationPipe implements PipeTransform {
  transform(value: CreateCategoryDto): CreateCategoryDto {
    // console.log('value is', value, value.name);
    const numericValue = Number(String(value.name).trim());

    if (!isNaN(numericValue)) {
      throw new BadRequestException('Numbers not allowed');
    }

    return value;
  }
}
