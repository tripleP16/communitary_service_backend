import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configValidationSchema } from './utils/env.validation';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { PrivilegesModule } from './privileges/privileges.module';
import { ResponseInterceptor } from './utils/shared/api/interceptors/response.interceptor';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionFilter } from './utils/shared/api/filters/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    DatabaseModule,
    UsersModule,
    PrivilegesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
