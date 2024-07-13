import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlergiesController } from './controllers/alergies.controller';
import { Alergies, AlergiesSchema } from './entities/alergies.entity';
import { AlergiesRepository } from './repositories/alergies.repository';
import { AlergiesService } from './services/alergies.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Alergies.name, schema: AlergiesSchema },
    ]),
  ],
  controllers: [AlergiesController],
  providers: [AlergiesService, AlergiesRepository],
  exports: [AlergiesService],
})
export class AlergiesModule {}
