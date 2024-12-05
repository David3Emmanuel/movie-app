import {
  createMovieDetailsUrl,
  createTVDetailsUrl,
  getDetails,
} from './details'
import type { MovieDetailsDTO, TVSeriesDetailsDTO } from './details.types'
import { getImage, getImageConfig } from './image'
import type { ImageConfig } from './image.types'
import { createSearchUrl, fetchAllPages } from './search'
import type { MovieDTO, MultiDTO, TVSeriesDTO } from './search.types'
import { createTrendingUrl } from './trending'
import { fetchSeasonDetails } from './tv'
import { extendFetch } from './utils/fetch'

export class TMDb {
  apiKey: string
  imageConfig: Promise<ImageConfig>

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.imageConfig = getImageConfig(apiKey)
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

  getMovieImage(id: number) {
    return getImage(this.apiKey, id, MediaType.Movie)
  }

  getTVImage(id: number) {
    return getImage(this.apiKey, id, MediaType.TV)
  }

  getSeasonDetails(series_id: number, season: number) {
    return fetchSeasonDetails(this.apiKey, series_id, season)
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

  async getTrendingMovies(timeWindow: TimeWindow = TimeWindow.Day) {
    const url = createTrendingUrl(this.apiKey, MediaType.Movie, timeWindow)
    const data = await extendFetch(url)
    return data.results as MovieDTO[]
  }

  async getTrendingTVShows(timeWindow: TimeWindow = TimeWindow.Day) {
    const url = createTrendingUrl(this.apiKey, MediaType.TV, timeWindow)
    const data = await extendFetch(url)
    return data.results as TVSeriesDTO[]
  }

  async getTrendingAll(timeWindow: TimeWindow = TimeWindow.Day) {
    const url = createTrendingUrl(this.apiKey, 'all', timeWindow)
    const data = await extendFetch(url)
    return data.results as MultiDTO[]
  }
}
export enum MediaType {
  Movie = 'movie',
  TV = 'tv',
}
export enum TimeWindow {
  Day = 'day',
  Week = 'week',
}
