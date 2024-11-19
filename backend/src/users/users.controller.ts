import { Controller, Get, Request, UseGuards } from '@nestjs/common'
import { JWTAuthGuard } from 'src/auth/jwt-auth.guard'
import { User } from './User'

@Controller('users')
export class UsersController {
  @Get('me')
  @UseGuards(JWTAuthGuard)
  getCurrentUser(@Request() req: Request & { user: User }) {
    return req.user
  }
}
