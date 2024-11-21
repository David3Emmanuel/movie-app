export async function extendFetch<T = any>(
  url: string | URL,
  options: RequestInit = {},
  retries: number | 'unlimited' = 3,
): Promise<T> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    if (!data.success) {
      if (retries === 'unlimited') return extendFetch(url, options, 'unlimited')
      if (retries > 1) return extendFetch(url, options, retries - 1)
    }

    return data
  } catch (e) {
    if (retries === 'unlimited') return extendFetch(url, options, 'unlimited')
    if (retries > 1) return extendFetch(url, options, retries - 1)
    throw e
  }
}
