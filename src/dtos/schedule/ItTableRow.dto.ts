import { ApiProperty } from '@nestjs/swagger';

export class ItTableRowDto {
  @ApiProperty()
  rateOfDepn: number;
  @ApiProperty()
  wdvstart: number;
  @ApiProperty()
  before180Days: number;
  @ApiProperty()
  after180Days: number;
  @ApiProperty()
  total: number;
  @ApiProperty()
  depForYear: number;
  @ApiProperty()
  wdvend: number;
  @ApiProperty()
  productType: string;
}
