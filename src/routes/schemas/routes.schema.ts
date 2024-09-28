import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type RoutesDocument = HydratedDocument<Routes>;

@Schema({ timestamps: true })
export class Routes {
  _id: Types.ObjectId;

  @Prop({ type: String })
  name: string;


}

// interface Marker {
// lat: number
// lon: number
// title: string
// icon: string,
// place: Place
// }

export const RoutesSchema = SchemaFactory.createForClass(Routes);
