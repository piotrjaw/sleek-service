import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import {
  assoc,
  eqProps,
  filter,
  find,
  groupBy,
  includes,
  map,
  pipe,
  prop,
  propEq,
  propSatisfies,
} from 'ramda';
import deals from '../assets/deals.json';
import { Deal } from './entities/deal.entity';
import { UserDealsService } from '../user-deals/user-deals.service';
import { UsersService } from '../users/users.service';
import { DealWithStatsDto } from './dto/deal-with-stats.dto';

@Injectable()
export class DealsService {
  private readonly deals: Deal[] = deals;
  private readonly logger: Logger = new Logger(DealsService.name);

  constructor(
    private readonly userDealsService: UserDealsService,
    private readonly usersService: UsersService,
  ) {}

  activate(deal_id: string, user_id: string) {
    this.logger.log(
      `Activating deal for deal_id: ${deal_id} and user: ${user_id}.`,
    );
    return this.userDealsService.create({ deal_id, user_id });
  }

  findAll(): DealWithStatsDto[] {
    this.logger.log('Retrieving all deals with statistics.');

    const users = this.usersService.findAll();

    // all of this could be done using a simple, much more performant SQL query,
    // should there be SQL in this project in the first place
    const userDealsStats = pipe(
      // @ts-ignore
      groupBy(prop('deal_id')),
      map(prop('length')),
      // @ts-ignore
    )(this.userDealsService.findAll());

    return map((deal: Deal): DealWithStatsDto => {
      const number_of_activations = userDealsStats[deal.deal_id] || 0;

      return {
        ...deal,
        number_of_activations,
        number_of_activations_percentage: number_of_activations / users.length,
      };
    })(this.deals);
  }

  findAllForUser(user_id: string): Deal[] {
    this.logger.log(`Retrieving all deals for user id: "${user_id}".`);
    const userDeals = this.userDealsService.findAllForUser(user_id);

    // all of this could be done using a simple, much more performant SQL query,
    // should there be SQL in this project in the first place
    return map((deal: Deal): Deal => {
      const matchingUserDeal = find(eqProps('deal_id', deal))(userDeals);

      if (matchingUserDeal) {
        return assoc('activated', matchingUserDeal.created, deal);
      }
      return deal;
    })(this.deals);
  }

  findOne(id: string) {
    this.logger.log(`Retrieving a deal for id: "${id}".`);
    const deal: Deal = find(propEq('deal_id', id))(this.deals) as Deal;
    if (!deal) {
      throw new NotFoundException();
    }
    return deal;
  }

  findAllByDomain(domain: string): Deal[] {
    this.logger.log(`Retrieving deals for domain: "${domain}".`);
    return filter(propSatisfies(includes(domain), 'retailer_domains'))(
      this.deals,
    );
  }
}
