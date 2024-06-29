import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({})
export class CodeEntity {
  @Prop({
    type: String,
    default: () => uuidv4(),
    required: true,
  })
  _id: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  code: string;

  @Prop({ required: true, type: Date })
  expiresAt: Date;
}

export const CodeSchema = SchemaFactory.createForClass(CodeEntity);
