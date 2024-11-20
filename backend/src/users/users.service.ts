import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { SignUpDTO } from 'src/auth/auth.dto'
import { asPublicUser, extractUser, User } from 'src/schemas/user.schema'

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private model: Model<User>) {}

  async getUsers() {
    return (await this.model.find().exec()).map((userDocument) =>
      asPublicUser(extractUser(userDocument)),
    )
  }

  async getRawUserByEmail(email: string) {
    const userDocument = await this.model.findOne({ email }).exec()
    return userDocument && extractUser(userDocument)
  }

  async getUserByEmail(email: string) {
    const user = await this.getRawUserByEmail(email)
    return user && asPublicUser(user)
  }

  async createUser(userDetails: SignUpDTO) {
    // FIXME hash passwords before storing
    this.model.create({
      ...userDetails,
      password: undefined,
      passwordHash: userDetails.password,
    })
  }
}
