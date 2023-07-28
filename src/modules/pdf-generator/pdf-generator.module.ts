import { Module } from '@nestjs/common';
import { PdfGeneratorController } from './pdf-generator.controller';
import { PdfGeneratorService } from './pdf-generator.service';
import { PdfTableItParamsDto } from 'src/dtos/schedule/pdfTableItParams.dto';

@Module({
  controllers: [PdfGeneratorController],
  providers: [PdfGeneratorService, PdfTableItParamsDto],
})
export class PdfGeneratorModule {}
