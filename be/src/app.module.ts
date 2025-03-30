import { Module } from '@nestjs/common';
import { UsersService } from './modules/users/users.service';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './modules/users/users.module';
import { ItemModule } from './modules/items/item.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseFormatInterceptor } from './interceptor/response-format.interceptor';

@Module({
  imports: [UsersModule, ItemModule,],
  providers: [UsersService, PrismaService, {
    provide: APP_INTERCEPTOR,
    useClass: ResponseFormatInterceptor,
  }],
})
export class AppModule { }
