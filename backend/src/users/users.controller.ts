import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard'
import { PublicUser } from 'src/schemas/user.schema'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getUsers()
  }

  @Get('me')
  @UseGuards(JWTAuthGuard)
  getCurrentUser(@Request() req: Request & { user: PublicUser }) {
    return req.user
  }
}
