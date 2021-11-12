import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TokenService } from '../../token/token.service';

@Injectable()
export class AddUserToRequestMiddleware implements NestMiddleware {
  private logger: Logger = new Logger(AddUserToRequestMiddleware.name);

  constructor(private readonly tokenService: TokenService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req?.headers;

    if (!authorization) {
      throw new UnauthorizedException('Authorization header missing');
    }

    this.logger.log(`Authorizing request for token: "${authorization}".`);

    res.locals.user = this.tokenService.decode(authorization);

    if (!res.locals.user) {
      throw new UnauthorizedException('User not found');
    }

    this.logger.log(`Authorized user with e-mail: "${res.locals.user.email}".`);

    next();
  }
}
