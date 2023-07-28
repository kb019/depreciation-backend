import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Scope,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { CreateCategoryDto } from 'src/dtos/category/createCategory.dto';
import { PageDto } from 'src/dtos/common/page.dto';
import { PageMetaDto } from 'src/dtos/common/pageMeta.dto';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private _categoryRepository: Repository<Category>,
  ) {}

  async createCategory(
    userId: string,
    createCategoryBody: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const category = this._categoryRepository.create({
        name: createCategoryBody.name,
        users: {
          id: userId,
        },
      });

      await this._categoryRepository.save(category);
      return category;
    } catch (error) {
      throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
    }
  }

  async updateCategory(
    categoryId: string,
    categoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      await this._categoryRepository.update(categoryId, categoryDto);

      const updatedCategory = await this._categoryRepository.findOne({
        where: { id: categoryId },
      });
      return updatedCategory;
    } catch (error) {
      throw new HttpException('Duplicate entry', HttpStatus.CONFLICT);
    }
  }

  async deleteCategory(categoryId: string): Promise<{ message: string }> {
    try {
      await this._categoryRepository.delete(categoryId);
      return { message: 'Category deleted successfully' };
    } catch (e) {
      console.log(e);
      throw new HttpException('Not valid id', HttpStatus.CONFLICT);
    }
  }

  async getCategories(
    userId: string,
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Category>> {
    try {
      const skip = (pageOptionsDto.page - 1) * pageOptionsDto.take;
      const queryBuilder =
        this._categoryRepository.createQueryBuilder('category');
      queryBuilder
        .orderBy('category.created_at', pageOptionsDto.order)
        .where('category.name like :categoryName', {
          categoryName: `%${pageOptionsDto.search}%`,
        })
        .andWhere('category.usersId = :userId', { userId: userId })
        .skip(skip)
        .take(pageOptionsDto.take);

      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();

      const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

      return new PageDto(entities, pageMetaDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Not able to get categories',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllCategoriesWithoutPagination(userId: string): Promise<Category[]> {
    try {
      return this._categoryRepository.find({
        where: {
          users: {
            id: userId,
          },
        },
      });
    } catch (e) {
      new HttpException('Unable to get Categories', HttpStatus.BAD_REQUEST);
    }
  }

  async getCategoryById(categoryId: string): Promise<Category> {
    try {
      const category = await this._categoryRepository.findOne({
        where: {
          id: categoryId,
        },
      });

      return category;
    } catch (e) {
      throw new HttpException(
        'Not able to get category by id',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
