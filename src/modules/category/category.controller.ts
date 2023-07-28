import {
  Body,
  Controller,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  Delete,
  Query,
  Get,
  Req,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from 'src/dtos/category/createCategory.dto';
import { CreateCategoryValidationPipe } from 'src/pipes/createCategoryValidationPipe';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { Request } from 'express';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private _categoryService: CategoryService) {}

  @Post('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Create New category' })
  @ApiResponse({ status: 200, description: 'OK' })
  @UsePipes(new CreateCategoryValidationPipe())
  createCategory(@Req() req: Request, @Body() categoryDto: CreateCategoryDto) {
    const userId = req.user['sub'];
    return this._categoryService.createCategory(userId, categoryDto);
  }

  @Put(':categoryId')
  @ApiOperation({ summary: 'Update Category by id' })
  @ApiResponse({ status: 200, description: 'OK' })
  @UsePipes(new CreateCategoryValidationPipe())
  @HttpCode(200)
  updateCategory(
    @Param('categoryId') categoryId: string,
    @Body() categoryDto: CreateCategoryDto,
  ) {
    return this._categoryService.updateCategory(categoryId, categoryDto);
  }

  @Delete(':categoryId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete Category' })
  @ApiResponse({ status: 200, description: 'OK' })
  deleteCategory(@Param('categoryId') categoryId: string) {
    return this._categoryService.deleteCategory(categoryId);
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({ summary: 'get all categories with pagination' })
  @ApiResponse({ status: 200, description: 'OK' })
  getCategories(@Req() req: Request, @Query() pageOptionsDto: PageOptionsDto) {
    const userId = req.user['sub'];
    return this._categoryService.getCategories(userId, pageOptionsDto);
  }

  @Get('plain')
  @HttpCode(200)
  @ApiOperation({ summary: 'get Categories without pagination' })
  @ApiResponse({ status: 200, description: 'OK' })
  getAllCategoriesWithoutPagination(@Req() req: Request) {
    const userId = req.user['sub'];
    return this._categoryService.getAllCategoriesWithoutPagination(userId);
  }

  @Get(':categoryId')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get category By ID' })
  @ApiResponse({ status: 200, description: 'OK' })
  getCategoryById(@Param('categoryId') categoryId: string) {
    return this._categoryService.getCategoryById(categoryId);
  }
}
