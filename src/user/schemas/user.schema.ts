import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { UserType } from '../enums/user-type.enum';
import { UserAuthType } from '../enums/user-auth-type.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String })
  username: string;

  @Prop({ type: String })
  picture: string;

  @Prop({ type: String, required: false })
  hash: string;

  @Prop({
    type: String,
    enum: UserType,
    required: true,
    default: UserType.User,
  })
  type: UserType;

  @Prop({
    type: [String],
    required: true,
    enum: UserAuthType,
  })
  authType: UserAuthType[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'Badge', default: [] })
  badges: mongoose.Types.ObjectId[];

  @Prop({ type: [mongoose.Types.ObjectId], ref: 'User', default: [] })
  friends: mongoose.Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
