import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MovieDBModule } from './moviedb/moviedb.module'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MovieDBModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
