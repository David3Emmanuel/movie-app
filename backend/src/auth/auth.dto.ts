import { IsEmail, IsNotEmpty } from 'class-validator'

export class UserCredentials {
  @IsEmail() email: string
  @IsNotEmpty() password: string
}

export class SignUpDTO extends UserCredentials {
  @IsNotEmpty() username: string
}

export class LoginDTO extends UserCredentials {}
