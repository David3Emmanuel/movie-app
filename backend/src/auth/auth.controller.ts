import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { User } from 'src/users/User'
import { SignUpDTO } from './auth.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: Request & { user: User }) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDTO) {
    this.authService.createUser(signUpDto)
    return { message: 'Success' }
  }
}
