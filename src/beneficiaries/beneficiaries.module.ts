import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AlergiesModule } from 'src/alergies/alergies.module';
import { BeneficiariesController } from './controllers/beneficiaries.controller';
import {
  Beneficiaries,
  BeneficiariesSchema,
} from './entities/beneficiary.entity';
import { BeneficiariesRepository } from './repositories/beneficiaries.repository';
import { BeneficiariesService } from './services/benifciaries.service';

@Module({
  controllers: [BeneficiariesController],
  providers: [BeneficiariesService, BeneficiariesRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Beneficiaries.name, schema: BeneficiariesSchema },
    ]),
    AlergiesModule,
  ],
})
export class BeneficiariesModule {}
