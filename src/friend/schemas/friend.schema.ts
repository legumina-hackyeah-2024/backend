import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId, Types } from 'mongoose';
import { FriendRequestStatus } from '../friend-request.status';

export type FriendRequestDocument = HydratedDocument<FriendRequest>;

@Schema({ timestamps: true })
export class FriendRequest {
  _id: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  from: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  to: ObjectId;

  @Prop({
    type: String,
    enum: FriendRequestStatus,
    default: FriendRequestStatus.PENDING,
  })
  status: string;
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest);
