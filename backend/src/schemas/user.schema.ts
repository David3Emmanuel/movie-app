import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument, Types } from 'mongoose'
import { MediaType } from '@project/tmdb'

export type PublicUser = Omit<User, 'passwordHash'> & {
  _id: Types.ObjectId
}

export type BasicUserInfo = Pick<User, 'email' | 'username'> & {
  _id: Types.ObjectId
}

@Schema()
export class MediaItem {
  @Prop({ required: true, enum: MediaType, type: String }) type: MediaType
  @Prop({ required: true }) id: number
}

@Schema()
export class Recommendation {
  @Prop({ required: true, type: MediaItem }) recommendedItem: MediaItem
  @Prop({ required: true, type: MediaItem }) source: MediaItem
}

@Schema()
export class User {
  @Prop({ required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }) email: string
  @Prop({ required: true }) username: string
  @Prop({ required: true }) passwordHash: string
  @Prop([MediaItem]) watchlist: MediaItem[]
  @Prop([MediaItem]) watchHistory: MediaItem[]
  @Prop({ childSchemas: Recommendation }) recommendations: Recommendation[]
}

export function extractUser(userDocument: Document<unknown, object, User>) {
  return userDocument.toObject({ versionKey: false })
}

export function asPublicUser(
  user: User & {
    _id: Types.ObjectId
  },
): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = user
  return rest
}

export function asBasicUserInfo(
  user: User & {
    _id: Types.ObjectId
  },
): BasicUserInfo {
  return { email: user.email, username: user.username, _id: user._id }
}

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = HydratedDocument<User>
