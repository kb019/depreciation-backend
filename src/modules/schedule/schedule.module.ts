import { Module, Scope } from '@nestjs/common';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';
import { PdfTableItParamsDto } from 'src/dtos/schedule/pdfTableItParams.dto';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class DepScheduleModule {}
