import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { MedicalHistory } from './medical.history.entity';
import { Parent } from './parent.entity';

@Schema({})
export class Beneficiaries extends Document {
  @Prop({
    type: String,
    default: () => uuidv4(),
    required: true,
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  birthday: Date;

  @Prop({ required: true })
  isPlayingSports: boolean;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  gender: string;

  @Prop([{ type: String, ref: 'Alergies' }])
  alergies: string[];

  @Prop([{ type: MedicalHistory }])
  medicalHistories: Types.ArraySubdocument<MedicalHistory>;

  @Prop({ type: Parent })
  parent: Types.Subdocument<Parent>;
}

export const BeneficiariesSchema = SchemaFactory.createForClass(Beneficiaries);
