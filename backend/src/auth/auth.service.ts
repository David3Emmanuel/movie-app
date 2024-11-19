import { Injectable, ConflictException } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { RawUser, User } from 'src/users/User'
import { JwtService } from '@nestjs/jwt'
import { SignUpDTO } from './auth.dto'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser({ username, password }: { username: string; password: string }) {
    const user = this.usersService.getUserByUsername(username)
    if (user && user.password === password) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user

      return rest as Omit<RawUser, 'password'>
    }

    return null
  }

  createUser({ username, password }: SignUpDTO) {
    const user = this.usersService.getUserByUsername(username)
    if (user) throw new ConflictException()
    this.usersService.createUser(username, password)
  }

  login(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return {
      access_token: this.jwtService.sign(user),
    }
  }
}
