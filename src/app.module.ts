import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { options } from './constant/db';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './global/exception-filter';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...options,
      type: 'mysql',
      charset: 'utf8mb4',
      autoLoadEntities: true,
      synchronize: true,
      logging: false,
      subscribers: [],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
