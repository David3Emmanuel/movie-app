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
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data as T | DetailsErrorDTO)
}
