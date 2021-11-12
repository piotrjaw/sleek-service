import { Module } from '@nestjs/common';
import { UserDealsService } from './user-deals.service';

@Module({
  controllers: [],
  providers: [UserDealsService],
  imports: [],
  exports: [UserDealsService],
})
export class UserDealsModule {}
