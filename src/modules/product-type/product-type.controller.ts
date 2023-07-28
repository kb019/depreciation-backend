import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ProductTypeService } from './product-type.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AddProductTypeDto } from 'src/dtos/productType/addProductType.dto';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { Request } from 'express';

@Controller('productType')
@ApiTags('Product Type')
export class ProductTypeController {
  constructor(private _productTypeService: ProductTypeService) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Create New Product Type (ex-buildings,machinery..etc)',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  createProduct(
    @Req() req: Request,
    @Body() productTypeInfo: AddProductTypeDto,
  ) {
    const userId = req.user['sub'];
    return this._productTypeService.addProductType(userId, productTypeInfo);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'Get All product types' })
  @ApiResponse({ status: 200, description: 'OK' })
  getAllProductTypes(
    @Req() req: Request,
    @Query() pageOptionsDto: PageOptionsDto,
  ) {
    const userId = req.user['sub'];
    return this._productTypeService.getAllProductTypes(userId, pageOptionsDto);
  }

  @Put(':productTypeId')
  @ApiOperation({ summary: 'Update Product Type by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @HttpCode(200)
  updateProductType(
    @Param('productTypeId') productId: string,
    @Body() updateProductInfo: AddProductTypeDto,
  ) {
    return this._productTypeService.updateProductType(
      productId,
      updateProductInfo,
    );
  }

  @Delete(':productTypeId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Product Type By Id' })
  @ApiResponse({ status: 200, description: 'OK' })
  deleteProduct(@Param('productTypeId') productTypeId: string) {
    return this._productTypeService.deleteProductType(productTypeId);
  }

  @Get('plain')
  @HttpCode(200)
  @ApiOperation({ summary: 'get product Types without pagination' })
  @ApiResponse({ status: 200, description: 'OK' })
  getProductTypessWithoutPagination(@Req() req: Request) {
    const userId = req.user['sub'];
    return this._productTypeService.getProductTypesWithoutPagination(userId);
  }
}
