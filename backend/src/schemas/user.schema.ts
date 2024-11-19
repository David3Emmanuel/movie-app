import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, HydratedDocument } from 'mongoose'

@Schema()
export class User {
  @Prop({ required: true }) username: string
  @Prop({ required: true }) passwordHash: string
}

export function extractUser(userDocument: Document<unknown, object, User>) {
  return userDocument.toObject({ versionKey: false })
}

export const UserSchema = SchemaFactory.createForClass(User)
