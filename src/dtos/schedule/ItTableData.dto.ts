import { ApiProperty } from '@nestjs/swagger';
import { ItTableRowDto } from './ItTableRow.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class ItTableDataDto {
  @ApiProperty()
  categoryName: string;
  @ApiProperty()
  data: ItTableRowDto[];
  @ApiProperty()
  meta: ItTableMeta;
}

export class ItTableMeta {
  @ApiProperty()
  total_wdvstart: number;
  @ApiProperty()
  total_before180Days: number;
  @ApiProperty()
  total_after180Days: number;
  @ApiProperty()
  total_total: number;
  @ApiProperty()
  total_depForYear: number;
  @ApiProperty()
  total_wdvend: number;
}
