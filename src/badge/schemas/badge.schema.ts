import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type BadgeDocument = HydratedDocument<Badge>;

@Schema({ timestamps: true })
export class Badge {
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  picture: string;
}

export const BadgeSchema = SchemaFactory.createForClass(Badge);
