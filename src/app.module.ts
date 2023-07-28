import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './modules/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './modules/product/product.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductTypeModule } from './modules/product-type/product-type.module';
import typeorm from 'src/config/typeorm';
import { DepreciationItModule } from './modules/depreciation-it/depreciation-it.module';
import { DepScheduleModule } from './modules/schedule/schedule.module';
import { ScheduleModule } from '@nestjs/schedule';
import { PdfGeneratorModule } from './modules/pdf-generator/pdf-generator.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { AuthGuard } from '@nestjs/passport';
import { AccessTokenGuard } from './guards/accessToken.guard';
import { APP_GUARD } from '@nestjs/core';

//https://www.brunnerliv.io/articles/advanced-nestjs-dymaic-providers
//https://dev.to/amirfakour/using-typeorm-migration-in-nestjs-with-postgres-database-3c75
@Module({
  imports: [
    CategoryModule,
    ProductModule,
    DatabaseModule,
    ProductModule,
    ProductTypeModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ScheduleModule.forRoot(),
    DepreciationItModule,
    DepScheduleModule,
    PdfGeneratorModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})
export class AppModule {}
