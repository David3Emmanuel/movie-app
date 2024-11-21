import { MediaType, TimeWindow } from '.'

export function createTrendingUrl(
  apiKey: string,
  mediaType: MediaType | 'all',
  timeWindow: TimeWindow,
) {
  const url = new URL(
    `https://api.themoviedb.org/3/trending/${mediaType}/${timeWindow}`,
  )
  url.searchParams.append('api_key', apiKey)
  return url
}
