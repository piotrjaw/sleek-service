import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { DealsModule } from './deals/deals.module';
import { UserDealsModule } from './user-deals/user-deals.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { AddUserToRequestMiddleware } from './common/middlewares/add-user-to-request.middleware';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    UsersModule,
    DealsModule,
    UserDealsModule,
    TokenModule,
  ],
  controllers: [],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AddUserToRequestMiddleware)
      .forRoutes(
        { path: 'deals', method: RequestMethod.GET },
        { path: 'deals*', method: RequestMethod.POST },
        'users/profile',
      );
  }
}
