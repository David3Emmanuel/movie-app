import { MediaType } from './index'

export type MediaDTO = MovieDTO | TVSeriesDTO | MultiDTO

export interface MovieDTO {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path?: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface TVSeriesDTO {
  adult: boolean
  backdrop_path?: string
  genre_ids: number[]
  id: number
  origin_country: string[]
  original_language: string
  original_name: string
  overview: string
  popularity: number
  poster_path?: string
  first_air_date: string
  name: string
  vote_average: number
  vote_count: number
}

export type MultiDTO = (MovieDTO | TVSeriesDTO) & {
  media_type: MediaType | string
}

export interface SearchResults<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}
