import { fetchDetails } from '@/utils/fetchDetails'
import createTorrentQuery from '@/utils/createTorrentQuery'
import searchTorrents from '@/utils/searchTorrents'
import Player from './Player'
import { fetchWithAuth } from '@/utils/fetchWithAuth'

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; name: string; info: string[] }>
}) {
  const { id, name, info } = await params
  const detailsParam = { id, names: [name] }

  const details = await fetchDetails(detailsParam)
  if (!details) return <p>Could not fetch media details</p>

  const torrentQuery = createTorrentQuery(details, info)
  if (!torrentQuery) return <p>Something went wrong. Please use a valid url</p>

  const torrents = await searchTorrents(torrentQuery)
  console.log(torrents)

  async function addToHistory() {
    'use server'
    let added = false
    while (!added) {
      const data = await fetchWithAuth(
        `${process.env.BACKEND_URL}/users/watch-history`,
      )
      added = Boolean(data.success)
    }
  }

  return <Player torrents={torrents} addToHistory={addToHistory} />
}
