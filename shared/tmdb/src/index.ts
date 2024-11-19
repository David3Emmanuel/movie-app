import { createSearchUrl, fetchAllPages } from './search'
import type {
  MovieDTO,
  MultiDTO,
  SearchResults,
  TVSeriesDTO,
} from './search.types'

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
export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}
