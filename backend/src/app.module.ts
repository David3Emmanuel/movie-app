import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { MovieDBController } from './moviedb/moviedb.controller'
import { MovieDBService } from './moviedb/moviedb.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController, MovieDBController],
  providers: [MovieDBService],
})
export class AppModule {}
