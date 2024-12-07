import type { TorrentData } from '@project/torrent-search/types/torrent/COMBO'
import Fuse from 'fuse.js'
import recursiveSearch from './recursiveSearch'

export interface TorrentInfo {
  link: string
  xt: string | undefined
  dn: string | undefined
  tr: string[]
  ws: string[]
}

export default function processResults(
  results: TorrentData[],
  query: string,
  limit = 5,
): TorrentInfo[] {
  const magnetLinks: string[] = []

  const startTime = Date.now()
  recursiveSearch(
    results,
    (value) => typeof value === 'string' && value.startsWith('magnet:'),
    magnetLinks,
  )
  const duration = (Date.now() - startTime) / 1000
  console.log(`Found ${magnetLinks.length} magnet links in ${duration}s`)

  console.log('Searching for:', query)

  const processedMagnetLinks = magnetLinks.map(processMagnetLink)

  const searcher = new Fuse(processedMagnetLinks, {
    keys: ['dn'],
  })
  const searchResults = searcher.search(query).map((result) => result.item)

  console.log(`Found ${searchResults.length} search results`)

  return searchResults.slice(0, limit)
}

function processMagnetLink(link: string) {
  const url = new URL(link)
  const params = new URLSearchParams(url.search)
  const info = {
    link,
    xt: params.get('xt') ?? undefined,
    dn: params.get('dn')?.replace(/\./g, ' '),
    tr: params.getAll('tr'),
    ws: params.getAll('ws'),
  }
  return info
}
