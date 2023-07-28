import {
  Body,
  Controller,
  Header,
  HttpCode,
  Param,
  Post,
  Res,
  StreamableFile,
  ValidationPipe,
} from '@nestjs/common';
import { PdfGeneratorService } from './pdf-generator.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ItTableDataDto } from 'src/dtos/schedule/ItTableData.dto';
import { PdfContent } from 'src/dtos/schedule/pdfContentIt.dto';
import { Response } from 'express';

@Controller('pdfGenerator')
@ApiTags('pdfGenerator')
export class PdfGeneratorController {
  constructor(private _pdfGenService: PdfGeneratorService) {}

  @Post('genItDepPdf/:year')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get pdf the it depreciation' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="DepreciationIt.pdf"')
  async generateItDepPdf(
    @Res({ passthrough: true }) res: Response,
    @Body() pdfContent: PdfContent,
    @Param('year') year: string,
  ): Promise<StreamableFile> {
    return this._pdfGenService.generateItDepPdf(
      pdfContent.tableInfo,
      year,
      pdfContent.companyInfo,
    );
  }
}
