import { Module } from '@nestjs/common';
import { DealsService } from './deals.service';
import { DealsController } from './deals.controller';
import { UserDealsModule } from '../user-deals/user-deals.module';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [DealsController],
  providers: [DealsService],
  exports: [DealsService],
  imports: [UserDealsModule, UsersModule],
})
export class DealsModule {}
