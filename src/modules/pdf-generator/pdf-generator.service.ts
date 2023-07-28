import { PdfTableItParamsDto } from 'src/dtos/schedule/pdfTableItParams.dto';
import { Injectable, StreamableFile } from '@nestjs/common';
import { ItTableDataDto } from 'src/dtos/schedule/ItTableData.dto';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';
import { CompanyInfo } from 'src/dtos/schedule/pdfContentIt.dto';
const PDFDocument = require('pdfkit');
const fs = require('fs');
const getStream = require('get-stream');

@Injectable()
export class PdfGeneratorService {
  constructor(private _pdfItTableParams: PdfTableItParamsDto) {}

  async generateItDepPdf(
    pdfContent: ItTableDataDto[],
    year: string,
    companyProfile: CompanyInfo,
  ) {
    try {
      const pdfDoc = new PDFDocument({ size: 'A3' });
      const file = 'SampleDocument.pdf';
      const writeStream = fs.createWriteStream(file);
      pdfDoc.pipe(writeStream);
      this._pdfItTableParams.generateHeader(pdfDoc, year, companyProfile);
      this._pdfItTableParams.generateTableHeader(pdfDoc, year);
      this._pdfItTableParams.generateTableContent(pdfDoc, pdfContent);
      pdfDoc.end();
      const pdfbuf = await getStream.buffer(pdfDoc);
      return new StreamableFile(pdfbuf);

      //***************************another working solution,just for reference**********************************/

      // const pdfDoc = new PDFDocument();
      // const file = 'SampleDocument.pdf';
      // let num = Math.random();
      // const fd = fs.openSync('SampleDocument.pdf', 'w+');
      // const writeStream = fs.createWriteStream(null, {
      //   fd,
      //   encoding: 'utf8',
      // });

      // pdfDoc.pipe(writeStream);
      // pdfDoc.text(Math.round(num * 100) + '');
      // pdfDoc.end();
      // const readStream = createReadStream(file);
      // return new StreamableFile(readStream);
    } catch (e) {
      // console.log(e);
    }
  }
}
