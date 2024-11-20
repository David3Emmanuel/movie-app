import { DetailsErrorDTO } from './details.types'

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

export async function getDetails<T>(url: string | URL) {
  return extendFetch<T | DetailsErrorDTO>(url)
}
