import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Alergies {
  @Prop({
    type: String,
    default: () => uuidv4(),
    required: true,
  })
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;
}
export const AlergiesSchema = SchemaFactory.createForClass(Alergies);
