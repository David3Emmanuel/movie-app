import {
  createMovieDetailsUrl,
  createTVDetailsUrl,
  getDetails,
} from './details'
import type { MovieDetailsDTO, TVSeriesDetailsDTO } from './details.types'
import { createSearchUrl, fetchAllPages } from './search'
import type { MovieDTO, MultiDTO, TVSeriesDTO } from './search.types'
import { extendFetch } from './utils/fetch'

export class TMDb {
  apiKey: string

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  searchMovie(
    query: string,
    options?: {
      includeAdult?: boolean
    },
  ): Promise<MovieDTO[]> {
    const encodedQuery = encodeURIComponent(query)
    const includeAdult = options?.includeAdult || false
    const url = (page: number) =>
      createSearchUrl(
        this.apiKey,
        MediaType.Movie,
        encodedQuery,
        page,
        includeAdult,
      )

    return fetchAllPages<MovieDTO>(url)
  }

  searchTV(
    query: string,
    options?: {
      includeAdult?: boolean
    },
  ): Promise<TVSeriesDTO[]> {
    const encodedQuery = encodeURIComponent(query)
    const includeAdult = options?.includeAdult || false
    const url = (page: number) =>
      createSearchUrl(
        this.apiKey,
        MediaType.TV,
        encodedQuery,
        page,
        includeAdult,
      )

    return fetchAllPages<TVSeriesDTO>(url)
  }

  searchMulti(
    query: string,
    options?: {
      includeAdult?: boolean
    },
  ): Promise<MultiDTO[]> {
    const encodedQuery = encodeURIComponent(query)
    const includeAdult = options?.includeAdult || false
    const url = (page: number) =>
      createSearchUrl(this.apiKey, 'multi', encodedQuery, page, includeAdult)

    return fetchAllPages<MultiDTO>(url)
  }

  getMovieDetails(id: number) {
    const url = createMovieDetailsUrl(this.apiKey, id)
    return getDetails<MovieDetailsDTO>(url)
  }

  getTVDetails(id: number) {
    const url = createTVDetailsUrl(this.apiKey, id)
    return getDetails<TVSeriesDetailsDTO>(url)
  }

  async discoverMovie() {
    const data = await extendFetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}`,
    )
    return data.results
  }

  async discoverTV() {
    const data = await extendFetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}`,
    )
    return data.results
  }
}
export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}
