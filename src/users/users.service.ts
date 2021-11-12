import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { find, propEq } from 'ramda';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { TokenService } from '../token/token.service';

@Injectable()
export class UsersService {
  private readonly users: User[] = [];
  private readonly logger: Logger = new Logger(UsersService.name);

  constructor(private readonly tokenService: TokenService) {}

  create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;
    this.logger.log(`Creating a user with email: "${email}".`);
    const existingUser = this.findOneByEmail(email);
    if (existingUser) {
      throw new ConflictException(`User with email: ${email}`);
    }

    const user = new User(email);
    this.users.push(user);
    return user;
  }

  findAll() {
    this.logger.log('Retrieving all users.');
    return this.users;
  }

  findOne(id: string) {
    this.logger.log(`Retrieving a user with id: "${id}".`);
    const user = find(propEq('id', id))(this.users);
    if (!user) {
      throw new NotFoundException(`User with id: ${id} not found.`);
    }

    return user;
  }

  logIn(email: string) {
    const user = this.findOneByEmail(email);
    if (!user) {
      throw new NotFoundException(`User with email: ${email} not found.`);
    }
    return { token: this.tokenService.sign(user) };
  }

  private findOneByEmail(email: string) {
    this.logger.log(`Retrieving a user with e-mail: "${email}".`);
    return find(propEq('email', email))(this.users);
  }
}
