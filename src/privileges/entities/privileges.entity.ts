import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';
import { Document } from 'mongoose';

@Schema()
export class Privileges extends Document {
  @Prop({
    type: String,
    default: () => uuidv4(),
    required: true,
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: String, ref: 'Actions' }])
  actions: string[];
}
export const PrivilegesSchema = SchemaFactory.createForClass(Privileges);
