import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type HeroDocument = HydratedDocument<Hero>;

@Schema({ timestamps: true })
export class Hero {
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  picture: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
