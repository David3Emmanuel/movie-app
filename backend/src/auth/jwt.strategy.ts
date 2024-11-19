import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PublicUser } from 'src/schemas/user.schema'

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    })
  }

  validate(payload: PublicUser & { iat: number; exp: number }) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { iat, exp, ...rest } = payload
    return rest as PublicUser
  }
}
