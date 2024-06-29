import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCodeDto } from '../dtos/create.code.dto';
import { ForgotPasswordService } from '../services/forgot.password.service';
import { ValidateCodeDto } from '../dtos/validate.code.dto';

@ApiTags('Forgot password')
@Controller('code')
export class CodeController {
  constructor(private readonly forgotPasswordService: ForgotPasswordService) {}

  @Post('/create')
  async createCode(@Body() dto: CreateCodeDto) {
    return await this.forgotPasswordService.createCode(dto);
  }

  @Post('/validate')
  async validateCode(@Body() dto: ValidateCodeDto) {
    return await this.forgotPasswordService.validateCode(dto);
  }
}
