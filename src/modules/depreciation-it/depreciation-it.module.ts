import { Module } from '@nestjs/common';
import { DepreciationItController } from './depreciation-it.controller';
import { DepreciationItService } from './depreciation-it.service';

@Module({
  controllers: [DepreciationItController],
  providers: [DepreciationItService]
})
export class DepreciationItModule {

    
    
}
