import { Injectable, ConflictException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import { LoginDTO, SignUpDTO } from './auth.dto'
import { asPublicUser, PublicUser } from 'src/schemas/user.schema'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser({ username, password }: LoginDTO) {
    const user = await this.usersService.getRawUser(username)
    if (user && user.passwordHash === password) return asPublicUser(user)

    return null
  }

  async createUser({ username, password }: SignUpDTO) {
    const user = await this.usersService.getUserByUsername(username)
    if (user) throw new ConflictException()
    this.usersService.createUser(username, password)
  }

  async login(user: PublicUser) {
    return {
      access_token: this.jwtService.sign(user),
    }
  }
}
