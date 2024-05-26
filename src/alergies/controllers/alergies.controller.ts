import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/auth/guards/access.token.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Actions } from 'src/auth/decorators/actions.decorator';
import { CreateAlergiesDto } from '../dtos/create.alergies.dto';
import { AlergiesService } from '../services/alergies.service';

@ApiBearerAuth()
@ApiTags('Alergies')
@Controller('alergies')
export class AlergiesController {
  constructor(private readonly _alergiesService: AlergiesService) {}

  @Actions('CREATE_ALERGIE')
  @Post('/')
  @UseGuards(AccessTokenGuard)
  @UseGuards(RolesGuard)
  async createAlergies(@Body() alergies: CreateAlergiesDto) {
    return this._alergiesService.createAlergies(alergies);
  }
}
