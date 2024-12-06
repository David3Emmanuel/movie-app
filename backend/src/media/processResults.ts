import type { TorrentData } from '@project/torrent-search/types/torrent/COMBO'

export default function processResults(
  results: TorrentData[],
  query: string,
  limit = 1,
) {
  const magnetLinks: string[] = []

  const normalizeString = (str: string) =>
    str
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, ' ')

  const normalizedQuery = normalizeString(query)
  const queryChunks = normalizedQuery.split(/\s+/)

  const checkQueryMatch = (value: string) =>
    queryChunks.every((chunk) => normalizeString(value).includes(chunk))

  function recursiveSearch(
    data: any,
    condition: (value: string) => boolean,
    prev: any[],
  ) {
    if (Array.isArray(data)) {
      for (const item of data) {
        recursiveSearch(item, condition, results)
      }
    } else if (typeof data === 'object' && data !== null) {
      for (const key in data) {
        if (typeof key !== 'string') continue
        const value = data[key]
        if (!value) continue
        if (typeof key === 'string' && condition(value)) {
          prev.push(value)
        } else {
          recursiveSearch(value, condition, prev)
        }
      }
    }
  }

  for (const result of results) {
    const names = []
    recursiveSearch(
      result,
      (value) => typeof value === 'string' && checkQueryMatch(value),
      names,
    )
    if (names.length) {
      console.log(names)
      recursiveSearch(
        result,
        (value) => typeof value === 'string' && value.startsWith('magnet:'),
        magnetLinks,
      )
      if (magnetLinks.length >= limit) {
        return magnetLinks.slice(0, limit)
      }
    }
  }

  return []
}
