export interface EpisodeDTO {
  air_date: string
  episode_number: number
  id: number
  name: string
  overview: string
  production_code: string
  runtime: number
  season_number: number
  show_id: number
  still_path: string
  vote_average: number
  vote_count: number
  crew: {
    department: string
    job: string
    credit_id: string
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }[]
  guest_stars: {
    character: string
    credit_id: string
    order: number
    adult: boolean
    gender: number
    id: number
    known_for_department: string
    name: string
    original_name: string
    popularity: number
    profile_path: string
  }[]
}

export interface SeasonDetailsDTO {
  _id: string
  air_date: string
  episodes: EpisodeDTO[]
  name: string
  overview: string
  id: number
  poster_path: string
  season_number: number
  vote_average: number
}

export interface EpisodeWithImageDTO extends EpisodeDTO {
  image_src: string
}

export interface SeasonDetailsWithImagesDTO extends SeasonDetailsDTO {
  episodes: EpisodeWithImageDTO[]
}
