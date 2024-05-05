import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';
import { AccessTokenStrategy } from './strategies/access.token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh.token.strategy';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
    TokenService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
