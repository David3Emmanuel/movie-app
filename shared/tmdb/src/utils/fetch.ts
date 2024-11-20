async function extendFetch<T = any>(
  url: string | URL,
  options: RequestInit = {},
  retries: number = 3,
): Promise<T> {
  try {
    const response = await fetch(url, options)
    const data = await response.json()
    if (!data.success && retries > 1)
      return extendFetch(url, options, retries - 1)

    return data
  } catch (e) {
    if (retries > 1) return extendFetch(url, options, retries - 1)
    throw e
  }
}
