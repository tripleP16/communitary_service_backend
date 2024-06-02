export class CreateBeneficiariesDao {
  readonly _id: string;
  readonly name: string;
  readonly lastname: string;
  readonly birthday: Date;
  readonly isPlayingSports: boolean;
  readonly createdAt: Date;
  readonly gender: string;
  readonly alergies: string[];
  readonly medicalHistories: MedicalHistoryDao[];
  readonly parent: ParentDao;
}

export class ParentDao {
  readonly _id: string;
  readonly name: string;
  readonly lastname: string;
  readonly phoneNumber: string;
}

export class MedicalHistoryDao {
  readonly _id: string;
  readonly height: number;
  readonly weight: number;
  readonly createdAt: Date;
}
