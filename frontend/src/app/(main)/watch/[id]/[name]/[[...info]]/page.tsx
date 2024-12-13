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
    // let retries = 3
    // while (retries > 0) {
    try {
      const body = { id: details?.id, type: details?.type }
      const data = await fetchWithAuth(
        `${process.env.BACKEND_URL}/users/watch-history`,
        {
          method: 'POST',
          body: JSON.stringify(body),
        },
        true,
      )
      if (data.success) return
    } catch (e) {
      console.error(e)
      // retries -= 1
    }
    // }
  }

  return <Player torrents={torrents} addToHistory={addToHistory} />
}
