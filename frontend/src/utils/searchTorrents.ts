import type { TorrentInfo } from '@project/backend/src/media/processResults'

export default async function searchTorrents(searchQuery: string) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/media/?query=${searchQuery}`,
  )
  const data = await res.json()
  return data as TorrentInfo[]
}
