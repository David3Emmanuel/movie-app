export interface ImageConfig {
  base_url: string
  secure_base_url: string
  backdrop_sizes: string[]
  logo_sizes: string[]
  poster_sizes: string[]
  profile_sizes: string[]
  still_sizes: string[]
}

export interface MediaImageDTO {
  backdrops: Image[]
  id: number
  logos: Image[]
  posters: Image[]
}

export interface Image {
  aspect_ratio: number
  height: number
  iso_639_1?: string
  file_path: string
  vote_average: number
  vote_count: number
  width: number
}

export interface MediaImageWithSrcDTO extends MediaImageDTO {
  backdrops: ImageWithSrc[]
  logos: ImageWithSrc[]
  posters: ImageWithSrc[]
}

export interface ImageWithSrc extends Image {
  src: string
}

export type ImageErrorDTO = object & {
  success: false
}
