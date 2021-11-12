import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TokenService } from './token.service';

@Module({
  controllers: [],
  providers: [TokenService],
  imports: [ConfigModule],
  exports: [TokenService],
})
export class TokenModule {}
