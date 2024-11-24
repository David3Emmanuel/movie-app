import { getAccessToken } from './watchlist'

export async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = await getAccessToken()
  const res = await fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`,
    },
  })
  const data = await res.json()
  if (data.statusCode === 401) {
    throw new Error('Unauthorized')
  }
  return data
}
