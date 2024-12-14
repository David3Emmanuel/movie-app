import { getAccessToken } from './getAccessToken'

export async function fetchWithAuth(
  url: string,
  options: RequestInit = {},
  withJsonBody?: boolean,
  withoutJsonResponse?: boolean,
) {
  const accessToken = await getAccessToken()
  const res = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      ...(withJsonBody && { 'Content-Type': 'application/json' }),
      ...options.headers,
    },
  })
  if (withoutJsonResponse) return res

  const data = await res.json()
  if (data.statusCode === 401) {
    throw new Error('Unauthorized')
  }
  return data
}
