import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { title } from 'process';

export type RoutesDocument = HydratedDocument<Routes>;

@Schema({ timestamps: true })
export class Routes {
  _id: Types.ObjectId;

  @Prop({ type: String })
  heroId: string;

  @Prop({ type: String })
  badgeId: string;

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

  @Prop({ type: [String] })
  facilities: string[]

  @Prop({
    type: {
      title: { type: String },
      description: { type: String },
      lat: { type: Number },
      lng: { type: Number },
    }
  })
  cache: { title: string, description: string, lat: number, lng: number }

  @Prop({
    raw: [
      {
        title: { type: String },
        description: { type: String },
        lat: { type: Number },
        lng: { type: Number },
        question: { type: String },
        answers: { type: [String] },
        correctAnswerIdx: { type: Number }
      }
    ]
  })
  points: {
    title: string,
    description: string,
    lat: number,
    lng: number,
    question: string,
    answers: string[]
    correctAnswerIdx: number
  }[]
}

export const RoutesSchema = SchemaFactory.createForClass(Routes);
