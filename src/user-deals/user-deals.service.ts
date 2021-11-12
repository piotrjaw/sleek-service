import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { both, filter, find, propEq } from 'ramda';
import { CreateUserDealDto } from './dto/create-user-deal.dto';
import { UserDeal } from './entities/user-deal.entity';

@Injectable()
export class UserDealsService {
  private readonly userDeals: UserDeal[] = [];
  private readonly logger: Logger = new Logger(UserDealsService.name);

  create(createUserDealDto: CreateUserDealDto) {
    const { user_id, deal_id } = createUserDealDto;

    const existingUserDeal = find(
      both(propEq('deal_id', deal_id), propEq('user_id', user_id)),
    )(this.userDeals);

    if (existingUserDeal) {
      throw new ConflictException(
        `User deal for user ID: ${user_id} and deal ID: ${deal_id} already exists.`,
      );
    }
    this.logger.log(
      `Creating a new user deal for user ID: ${user_id} and deal ID: ${deal_id}`,
    );
    this.userDeals.push(new UserDeal(user_id, deal_id));
  }

  findAll() {
    this.logger.log('Retrieving all deals.');
    return this.userDeals;
  }

  findAllForUser(user_id: string) {
    this.logger.log(`Retrieving all user deals for user id: "${user_id}".`);
    return filter(propEq('user_id', user_id))(this.userDeals);
  }
}
