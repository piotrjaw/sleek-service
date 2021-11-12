import { getUuidV4 } from '../../common/utils/uuid';

export class User {
  id: string;
  email: string;

  constructor(email: string) {
    this.id = getUuidV4();
    this.email = email;
  }
}
