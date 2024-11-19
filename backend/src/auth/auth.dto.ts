import { IsNotEmpty } from 'class-validator'

export class UserCredentials {
  @IsNotEmpty() username: string
  @IsNotEmpty() password: string
}

export class SignUpDTO extends UserCredentials {}

export class LoginDTO extends UserCredentials {}
