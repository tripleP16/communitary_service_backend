import { GetAlergiesDao } from 'src/alergies/dao/get.alergies.dao';

export class GetBeneficiariesDao {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly birthday: Date;
  readonly isPlayingSports: boolean;
  readonly createdAt: Date;
  readonly gender: string;
  readonly alergies: GetAlergiesDao[];
  readonly medicalHistories: GetMedicalHistoryDao[];
  readonly parent: GetParentDao;
}

export class GetParentDao {
  readonly id: string;
  readonly name: string;
  readonly lastname: string;
  readonly phoneNumber: string;
}

export class GetMedicalHistoryDao {
  readonly id: string;
  readonly height: number;
  readonly weight: number;
  readonly createdAt: Date;
}
