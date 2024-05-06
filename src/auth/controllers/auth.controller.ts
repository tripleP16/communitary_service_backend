import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dtos/login.dto';
import { RefreshTokenGuard } from '../guards/refresh.token.guard';
import { Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/login')
  async login(@Body() dto: LoginDto) {
    return await this._authService.login(dto);
  }

  @ApiBearerAuth()
  @UseGuards(RefreshTokenGuard)
  @Post('/refresh')
  async refreshToken(@Req() req: Request) {
    const userId = req.user['sub'];
    return await this._authService.refreshTokens(userId);
  }
}
