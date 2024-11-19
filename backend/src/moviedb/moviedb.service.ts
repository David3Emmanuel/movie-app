import { Injectable } from '@nestjs/common'
import { GetDetailsQueryDto, SearchQueryDto } from './moviedb.dto'
import { MediaType, TMDb } from '@project/tmdb'

@Injectable()
export class MovieDBService {
  tmdb: TMDb
  constructor() {
    if (!process.env.TMDB_API_KEY) throw new Error()
    this.tmdb = new TMDb(process.env.TMDB_API_KEY)
  }

  search(searchQuery: SearchQueryDto) {
    if (searchQuery.type === MediaType.Movie)
      return this.tmdb.searchMovie(searchQuery.query)
    if (searchQuery.type === MediaType.TV)
      return this.tmdb.searchTV(searchQuery.query)

    return this.tmdb.searchMulti(searchQuery.query)
  }

  getDetails(getDetailsQuery: GetDetailsQueryDto) {
    if (getDetailsQuery.type === MediaType.Movie)
      return this.tmdb.getMovieDetails(getDetailsQuery.id)
    return this.tmdb.getTVDetails(getDetailsQuery.id)
  }

  discover(type: MediaType) {
    if (type === MediaType.Movie) return this.tmdb.discoverMovie()
    else if (type === MediaType.TV) return this.tmdb.discoverTV()
  }
}
