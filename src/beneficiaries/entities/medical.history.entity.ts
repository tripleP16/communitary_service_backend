import { Prop } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

export class MedicalHistory {
  @Prop({
    type: String,
    default: () => uuidv4(),
    required: true,
  })
  _id: string;
  @Prop({ required: true })
  height: number;
  @Prop({ required: true })
  weight: number;
  @Prop({ required: true })
  createdAt: Date;

  @Prop({ type: String, ref: 'Beneficiaries' })
  beneficiaryId: string;
}
