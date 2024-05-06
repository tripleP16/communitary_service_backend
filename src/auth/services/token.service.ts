import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async getTokens(userId: string, actions: string[]) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          actions,
        },
        {
          secret: this.configService.get<string>('ACCESS_SECRET'),
          expiresIn: '1h',
        },
      ),

      this.jwtService.signAsync(
        {
          sub: userId,
          actions,
        },
        {
          secret: this.configService.get<string>('REFRESH_SECRET'),
          expiresIn: '3d',
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
