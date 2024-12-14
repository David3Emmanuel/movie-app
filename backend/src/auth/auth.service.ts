import { Injectable, ConflictException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDTO, SignUpDTO } from './auth.dto'
import { asBasicUserInfo, BasicUserInfo } from 'src/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ email, password }: LoginDTO) {
    const user = await this.usersService.getRawUserByEmail(email)
    if (
      user &&
      (await this.usersService.validatePassword(password, user.passwordHash))
    ) {
      return asBasicUserInfo(user)
    }
    return null
  }

  async createUser(userDetails: SignUpDTO) {
    const user = await this.usersService.getUserByEmail(userDetails.email)
    if (user) throw new ConflictException()
    this.usersService.createUser(userDetails)
  }

  async login(user: BasicUserInfo) {
    return {
      access_token: this.jwtService.sign(user),
    }
  }
}
