import { getUuidV4 } from '../../common/utils/uuid';

export class UserDeal {
  id: string;
  user_id: string;
  deal_id: string;
  created: Date;

  constructor(user_id: string, deal_id: string) {
    this.id = getUuidV4();
    this.user_id = user_id;
    this.deal_id = deal_id;
    this.created = new Date();
  }
}
