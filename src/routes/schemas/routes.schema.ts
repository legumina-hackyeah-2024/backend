import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoutesDocument = HydratedDocument<Routes>;

@Schema({ timestamps: true })
export class Routes {
  _id: Types.ObjectId;

  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  icon: string;

  @Prop({ type: Number })
  distance: number

  @Prop({ type: Number })
  difficulty: number

  @Prop({ type: Number })
  lat: number

  @Prop({ type: Number })
  lng: number
}

export const RoutesSchema = SchemaFactory.createForClass(Routes);
