import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DepreciationItService } from './depreciation-it.service';
import { PageOptionsDto } from 'src/dtos/common/pageOptions.dto';
import { UpdateDepreciationItDto } from 'src/dtos/depreciation-it/updateDepreciationIt.dto';
import { Request } from 'express';

@ApiTags('Depreciation-It')
@Controller('depreciation-it')
export class DepreciationItController {
  constructor(private _depService: DepreciationItService) {}

  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all the depreciation rates' })
  @ApiResponse({ status: 200, description: 'OK' })
  async getAllRates(@Req() req: Request, @Query() pageOptionDto: PageOptionsDto) {
    const userId = req.user['sub'];
    return this._depService.getAllRates(userId,pageOptionDto);
  }

  @Get(':productTypeId')
  @HttpCode(200)
  @ApiOperation({
    summary:
      'Get all the depreciation rates with particular Product with pagination',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  async getRatesByProductType(
    @Param('productTypeId') productTypeId: string,
    @Query() pageOptionDto: PageOptionsDto,
  ) {
    return this._depService.getRatesByProductType(productTypeId, pageOptionDto);
  }

  @Put(':depreciationItId')
  @ApiOperation({ summary: 'Update Id for It depreciations' })
  @ApiResponse({ status: 200, description: 'OK' })
  @HttpCode(200)
  updateDepreciationRate(
    @Param('depreciationItId') depreciationItId: string,
    @Body() updateDepreciationItInfo: UpdateDepreciationItDto,
  ) {
    return this._depService.updateDepreciationRate(
      depreciationItId,
      updateDepreciationItInfo,
    );
  }
}
