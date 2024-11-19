import { IsNotEmpty } from 'class-validator'

export class SignUpDTO {
  @IsNotEmpty() username: string
  @IsNotEmpty() password: string
}
