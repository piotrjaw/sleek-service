import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import jwt from 'jsonwebtoken';

@Injectable()
export class TokenService {
  constructor(private readonly configService: ConfigService) {}

  sign(data: Record<string, any>): string {
    return jwt.sign(
      JSON.parse(JSON.stringify(data)),
      this.configService.get('JWT_SECRET_KEY'),
    );
  }

  decode(token: string): Record<string, any> {
    return jwt.verify(token, this.configService.get('JWT_SECRET_KEY'));
  }
}
