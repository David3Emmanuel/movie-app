import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { asPublicUser, extractUser, User } from 'src/schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async getUsers() {
    return (await this.model.find().exec()).map((userDocument) =>
      asPublicUser(extractUser(userDocument)),
    )
  }

  async getRawUser(username: string) {
    const userDocument = await this.model.findOne({ username }).exec()
    return userDocument && extractUser(userDocument)
  }

  async getUserByUsername(username: string) {
    const user = await this.getRawUser(username)
    return user && asPublicUser(user)
  }

  async createUser(username: string, password: string) {
    // FIXME hash passwords before storing
    this.model.create({ username, passwordHash: password })
  }
}
