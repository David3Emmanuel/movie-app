export interface MediaDetailsDTO {
  adult: boolean
  backdrop_path: string
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  origin_country: string[]
  original_language: string
  overview: string
  popularity: number
  poster_path: string
  production_companies: {
    id: number
    logo_path?: string | null
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  vote_average: number
  vote_count: number
}

export interface MovieDetailsDTO extends MediaDetailsDTO {
  belongs_to_collection?: any
  budget: number
  imdb_id: string
  original_title: string
  release_date: string
  revenue: number
  runtime: number
  title: string
  video: boolean
}

export interface TVSeriesDetailsDTO extends MediaDetailsDTO {
  created_by: any[]
  episode_run_time: number[]
  first_air_date: string
  in_production: boolean
  languages: string[]
  last_air_date: string
  last_episode_to_air: {
    id: number
    name: string
    overview: string
    vote_average: number
    vote_count: number
    air_date: string
    episode_number: number
    episode_type: string
    production_code: string
    runtime: number
    season_number: number
    show_id: number
    still_path: string
  }
  name: string
  next_episode_to_air?: any
  networks: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  number_of_episodes: number
  number_of_seasons: number
  original_name: string
  seasons: {
    air_date: string
    episode_count: number
    id: number
    name: string
    overview: string
    poster_path: string
    season_number: number
    vote_average: number
  }[]
  type: string
}

export type DetailsErrorDTO = object & {
  success: false
}
