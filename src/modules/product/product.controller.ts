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
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { AddProductDto } from 'src/dtos/product/addProduct.dto';
import { CreateCategoryValidationPipe } from 'src/pipes/createCategoryValidationPipe';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { Request } from 'express';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private _productService: ProductService) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create New Product' })
  @ApiResponse({ status: 200, description: 'OK' })
  createProduct(@Req() req: Request, @Body() productDto: AddProductDto) {
    const userId = req.user['sub'];
    return this._productService.addProduct(userId,productDto);
  }

  @Put(':productId')
  @ApiOperation({ summary: 'Update Product by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @HttpCode(200)
  updateProductategory(
    @Param('productId') productId: string,
    @Body() productDto: AddProductDto,
  ) {
    return this._productService.updateProduct(productId, productDto);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'get all products with pagination' })
  @ApiResponse({ status: 200, description: 'OK' })
  getProducts(@Req() req: Request,@Query() pageOptionsDto: PageOptionsDto) {
    const userId = req.user['sub'];

    return this._productService.getProducts(userId,pageOptionsDto);
  }

  @Get(':productId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get Product By Id' })
  @ApiResponse({ status: 200, description: 'OK' })
  getProductById(@Param('productId') productId: string) {
    return this._productService.getProductDetailsById(productId);
  }

  @Delete(':productId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Product' })
  @ApiResponse({ status: 200, description: 'OK' })
  deleteProduct(@Param('productId') productId: string) {
    return this._productService.deleteProduct(productId);
  }
}
