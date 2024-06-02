import { Prop, Schema } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({})
export class Parent {
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
  phoneNumber: string;
}
