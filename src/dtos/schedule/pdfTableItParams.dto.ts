import { Injectable, Scope } from '@nestjs/common';
import { ItTableDataDto } from './ItTableData.dto';
import { UpdateUser } from '../user/updateUser.dto';
import { CompanyInfo } from './pdfContentIt.dto';

@Injectable({ scope: Scope.REQUEST })
export class PdfTableItParamsDto {
  leftMarginStart: number;
  totalTableArea: number;
  tableStarty: number;
  headerItems: string[];
  curYPos: number;
  columnWidth: number;
  sampleItems: ItTableDataDto[];
  fontBold: string;
  fontlight: string;
  constructor() {
    this.leftMarginStart = 50;
    this.totalTableArea = 750;
    this.tableStarty = 50;
    this.curYPos = this.tableStarty;
    this.headerItems = [
      'PARTICULARS',
      'RATE OF DEPN',
      'W.D.V AS ON 01.04.2021',
      'BEFORE 180 DAYS',
      'ON/AFTER 180 DAYS',
      'TOTAL AS ON 31.03.2022',
      'DEPRECIATION FOR THE YEAR',
      'W.D.V AS ON 31.03.2022',
    ];
    //calculate width for each title
    this.columnWidth = Math.round(
      this.totalTableArea / this.headerItems.length,
    );
    this.fontlight = 'Helvetica';
    this.fontBold = 'Helvetica-Bold';
    this.sampleItems = [
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
      {
        categoryName: 'Plant and Machinery update',
        data: [
          {
            rateOfDepn: 0.09,
            wdvstart: 38,
            before180Days: 600,
            after180Days: 15009089809808099800809999,
            total: 9000638,
            depForYear: 405057,
            wdvend: 8595581,
            productType: 'Telephone',
          },
          {
            rateOfDepn: 0.03,
            wdvstart: 1426,
            before180Days: 0,
            after180Days: 15009089809808099800809999,
            total: 16435,
            depForYear: 268,
            wdvend: 16167,
            productType: 'Generator',
          },
        ],
        meta: {
          total_wdvstart: 1464,
          total_before180Days: 600,
          total_after180Days: 9015009,
          total_total: 9017073,
          total_depForYear: 405325,
          total_wdvend: 8611748,
        },
      },
    ];
  }

  generateHeader(doc, year: string, companyProfile: CompanyInfo) {
    doc
      .font('Helvetica-Bold')
      .fontSize(15)
      .text(`${companyProfile.companyName.toUpperCase()}`, { align: 'center' })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .text(`${companyProfile.address}`, { align: 'center', wordSpacing: 2 })
      .moveDown(2);

    doc
      .fontSize(12)
      .text(
        ` ACCOUNTING YEAR 01.04.${
          +year - 1
        } TO 31.03.${year} ASSESSMENT YEAR ${year}-${+year + 1}`,
        { align: 'center', wordSpacing: 5 },
      )
      .moveDown(1);

    doc.fontSize(12).text('  DEPRECIATION AS PER INCOME TAX ACT, 1961', {
      align: 'center',
      wordSpacing: 5,
    });

    this.increaseYby(doc, doc.y + 15);
    // .text('123 Main Street', 200, 65, { align: 'right' })
    // .text('New York, NY, 10025', 200, 80, { align: 'right' })
    // .moveDown();
  }

  generateRow(doc, ...items) {
    const curY = this.curYPos;
    for (let i = 0; i < items.length; i++) {
      const itemName = items[i];
      doc.text(itemName, this.leftMarginStart + i * this.columnWidth, curY, {
        align: 'center',
        width: this.columnWidth,
      });
      this.updateY(doc);
    }
    //increase space after ech row
    this.increaseYby(doc, 10);
  }

  generateLine(doc, x, y, width = this.totalTableArea) {
    doc
      .strokeColor('#aaaaaa')
      .lineWidth(1)
      .moveTo(x, y)
      .lineTo(x + width, y)
      .stroke();
    //increase y pos after drawing a line
    this.increaseYby(doc, 15);
  }
  generateTableHeader(doc, year: string) {
    //draw the border top for header titles
    this.generateLine(doc, this.leftMarginStart, this.curYPos);

    //draw the additions header
    doc.text(
      'Additions',
      this.leftMarginStart + this.columnWidth * 3,
      this.curYPos,
      {
        width: this.columnWidth * 3,
        align: 'center',
      },
    );
    //finish adition header and update y pos
    this.updateY(doc);
    //

    //generate line for addtion line
    this.generateLine(
      doc,
      this.leftMarginStart + this.columnWidth * 3,
      this.curYPos,
      this.columnWidth * 3,
    );

    doc.fontSize(10);

    this.generateRow(
      doc,
      this.headerItems[0],
      this.headerItems[1],
      `W.D.V AS ON 01.04.${+year - 1}`,
      this.headerItems[3],
      this.headerItems[4],
      `TOTAL AS ON 31.03.${year}`,
      this.headerItems[6],
      `W.D.V AS ON 01.04.${+year}`,
    );

    //now draw the borderbottom for header
    this.generateLine(doc, this.leftMarginStart, this.curYPos);
  }

  generateCategoryHeader(doc, categoryName) {
    doc.text(categoryName, this.leftMarginStart, this.curYPos);
    // keep track of current y pos after adding text
    this.updateY(doc);
    //to create sapce after category header
    this.increaseYby(doc, 15);
  }
  increaseYby(doc, num) {
    this.curYPos += num;
    this.checkAndAddPage(doc);
  }
  updateY(doc) {
    this.curYPos = Math.max(this.curYPos, doc.y);
  }
  generateTableContent(doc, pdfContent: ItTableDataDto[]) {
    this.sampleItems = pdfContent;
    for (let i = 0; i < this.sampleItems.length; i++) {
      const dataObj = this.sampleItems[i];
      this.generateCategoryHeader(doc, dataObj.categoryName);
      for (let j = 0; j < dataObj.data.length; j++) {
        const dataArr = dataObj.data[j];
        doc.font(this.fontlight);
        this.generateRow(
          doc,
          dataArr.productType,
          `${Math.round(dataArr.rateOfDepn * 100)} %`,
          new Intl.NumberFormat('en-IN').format(dataArr.wdvstart),
          new Intl.NumberFormat('en-IN').format(dataArr.before180Days),
          new Intl.NumberFormat('en-IN').format(dataArr.after180Days),
          new Intl.NumberFormat('en-IN').format(dataArr.total),
          new Intl.NumberFormat('en-IN').format(dataArr.depForYear),
          new Intl.NumberFormat('en-IN').format(dataArr.wdvend),
        );
      }

      this.generateLine(
        doc,
        this.leftMarginStart + 2 * this.columnWidth,
        this.curYPos,
        6 * this.columnWidth,
      );
      const meta = dataObj.meta;

      doc.font(this.fontBold);
      this.generateRow(
        doc,
        '',
        '',
        new Intl.NumberFormat('en-IN').format(meta.total_wdvstart),
        new Intl.NumberFormat('en-IN').format(meta.total_before180Days),
        new Intl.NumberFormat('en-IN').format(meta.total_after180Days),
        new Intl.NumberFormat('en-IN').format(meta.total_total),
        new Intl.NumberFormat('en-IN').format(meta.total_depForYear),
        new Intl.NumberFormat('en-IN').format(meta.total_wdvend),
      );

      this.generateLine(
        doc,
        this.leftMarginStart + 2 * this.columnWidth,
        this.curYPos,
        6 * this.columnWidth,
      );
    }
  }

  checkAndAddPage(doc) {
    if (this.curYPos > 1000) {
      doc.addPage();
      this.curYPos = doc.y + 20;
    }
  }
}
