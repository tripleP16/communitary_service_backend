import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema()
export class Actions extends Document {
  @Prop({
    type: String,
    default: () => uuidv4(),
    required: true,
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop([{ type: String, ref: 'Privileges' }])
  privileges: string[];
}
export const ActionsSchema = SchemaFactory.createForClass(Actions);
