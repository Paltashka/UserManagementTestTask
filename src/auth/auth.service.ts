import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken() {
    const payload: JwtPayload = {
      sub: 'test-user',
      email: 'admin@gmail.com',
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
