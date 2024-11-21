import { DetailsErrorDTO, MediaDetailsDTO } from './details.types'
import { extendFetch } from './utils/fetch'

export function createMovieDetailsUrl(apiKey: string, id: number) {
  const url = new URL(`https://api.themoviedb.org/3/movie/${id}`)
  url.searchParams.append('api_key', apiKey)
  return url
}

export function createTVDetailsUrl(apiKey: string, id: number) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${id}`)
  url.searchParams.append('api_key', apiKey)
  return url
}

export async function getDetails<T extends MediaDetailsDTO>(url: string | URL) {
  return extendFetch<T | DetailsErrorDTO>(url)
}
