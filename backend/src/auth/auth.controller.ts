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
import { SignUpDTO } from './auth.dto'
import { BasicUserInfo } from 'src/schemas/user.schema'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req: Request & { user: BasicUserInfo }) {
    return this.authService.login(req.user)
  }

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDTO) {
    await this.authService.createUser(signUpDto)
    return { message: 'Success' }
  }
}
