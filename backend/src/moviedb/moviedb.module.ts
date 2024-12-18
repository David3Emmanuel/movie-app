import { Module } from '@nestjs/common'
import { MovieDBController } from './moviedb.controller'
import { MovieDBService } from './moviedb.service'

@Module({
  controllers: [MovieDBController],
  providers: [MovieDBService],
  exports: [MovieDBService],
})
export class MovieDBModule {}
