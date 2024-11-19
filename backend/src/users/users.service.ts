import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { extractUser, User } from 'src/schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async getUsers() {
    return (await this.model.find().exec()).map(extractUser)
  }

  async getRawUser(username: string) {
    const userDocument = await this.model.findOne({ username }).exec()
    return userDocument && extractUser(userDocument)
  }

  getUserByUsername(username: string) {
    return this.getRawUser(username)
  }

  async createUser(username: string, password: string) {
    // FIXME hash passwords before storing
    this.model.create({ username, passwordHash: password })
  }
}
