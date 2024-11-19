import { Injectable } from '@nestjs/common'
import { GetDetailsQueryDto, SearchQueryDto } from './moviedb.dto'
import { MediaType, TMDb } from '@project/tmdb'

@Injectable()
export class MovieDBService {
  tmdb: TMDb
  constructor() {
    this.tmdb = new TMDb(process.env.TMDB_API_KEY)
  }

  search(searchQuery: SearchQueryDto) {
  }

  getDetails(getDetailsQuery: GetDetailsQueryDto) {
  }

  discover(type: MediaType) {
  }
}
