import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MovieDBModule } from './moviedb/moviedb.module'

@Module({
  imports: [ConfigModule.forRoot(), MovieDBModule],
})
export class AppModule {}
