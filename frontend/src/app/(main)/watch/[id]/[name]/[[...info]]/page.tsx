import { fetchDetails } from '@/utils/fetchDetails'
import createTorrentQuery from '@/utils/createTorrentQuery'

export default async function WatchPage({
  params,
}: {
  params: Promise<{ id: string; name: string; info: string[] }>
}) {
  const { id, name, info } = await params
  const detailsParam = { id, names: [name] }

  const details = await fetchDetails(detailsParam)
  if (!details) return <p>Media not found</p>

  const torrentQuery = createTorrentQuery(details, info)

  await new Promise((resolve) => setTimeout(resolve, 10_000))

  return torrentQuery
}
