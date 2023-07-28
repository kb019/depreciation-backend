import { ApiProperty } from '@nestjs/swagger';
import { ItTableDataDto } from './ItTableData.dto';
import { IsNotEmpty } from 'class-validator';


export class CompanyInfo {
  @ApiProperty()
  companyName: string;
  @ApiProperty()
  address: string;
  @ApiProperty()
  email: string;
}

export class PdfContent {
  @ApiProperty()
  @IsNotEmpty()
  tableInfo: ItTableDataDto[];

  @ApiProperty()
  @IsNotEmpty()
  companyInfo: CompanyInfo;
}


