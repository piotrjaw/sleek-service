import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenModule } from '../token/token.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [TokenModule],
  exports: [UsersService],
})
export class UsersModule {}
