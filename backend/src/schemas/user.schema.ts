import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

export type PublicUser = Omit<User, 'passwordHash'>

@Schema()
export class User {
  @Prop({ required: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }) email: string
  @Prop({ required: true }) username: string
  @Prop({ required: true }) passwordHash: string
}

export function extractUser(userDocument: Document<unknown, object, User>) {
  return userDocument.toObject({ versionKey: false })
}

export function asPublicUser(user: User): PublicUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { passwordHash, ...rest } = user
  return rest
}

export const UserSchema = SchemaFactory.createForClass(User)

export type UserDocument = HydratedDocument<User>
