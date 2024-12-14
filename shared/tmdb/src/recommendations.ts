import { DetailsErrorDTO } from './details.types'
import { MediaDTO, SearchResults } from './search.types'
import { extendFetch } from './utils/fetch'

export function createMovieRecommendationsUrl(apiKey: string, id: number) {
  const url = new URL(
    `https://api.themoviedb.org/3/movie/${id}/recommendations`,
  )
  url.searchParams.append('api_key', apiKey)
  return url
}

export function createTVRecommendationsUrl(apiKey: string, id: number) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${id}/recommendations`)
  url.searchParams.append('api_key', apiKey)
  return url
}

export async function getRecommendations<T extends MediaDTO>(
  url: string | URL,
) {
  const data = await extendFetch<SearchResults<T> | DetailsErrorDTO>(url)
  if ('page' in data) return data.results
  else throw data
}
