import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Response } from 'express';
import { ItTableDataDto } from 'src/dtos/schedule/ItTableData.dto';
import { Request } from 'express';

@Controller('schedule')
@ApiTags('schedule')
export class ScheduleController {
  constructor(private _scheduleService: ScheduleService) {}

  @Get('It/:year')
  @HttpCode(200)
  @ApiOperation({
    summary: 'generate schedule for it',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  async generateITSchedule(@Req() req: Request, @Param('year') year: string) {
    const userId = req.user['sub'];
    return this._scheduleService.generateSchedule(userId, year);
  }

  @Get('CheckRates/:year')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Check if there are any rates which are not filled',
  })
  @ApiResponse({ status: 200, description: 'OK' })
  async checkRatesFilledForYear(
    @Req() req: Request,
    @Param('year') year: string,
  ) {
    const userId = req.user['sub'];
    return this._scheduleService.checkRatesFilledForYear(userId,year);
  }
}
