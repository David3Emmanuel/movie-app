import Media from '@/components/Media'
import type { MediaDTO } from '@project/tmdb/types/search.types'

export default async function MediaRow({
  title,
  mediaItems,
}: {
  title: string
  mediaItems: MediaDTO[] | string
}) {
  let items: MediaDTO[]
  if (typeof mediaItems === 'string') {
    const res = await fetch(mediaItems)
    items = await res.json()
  } else items = mediaItems

  return (
    <div className='pl-4 pb-8'>
      <h2 className='text-xl font-semibold mt-3 mb-2'>{title}</h2>
      <div
        className='grid gap-4'
        style={{
          width: 'calc(100% + 288px)',
          gridTemplateColumns: 'repeat(auto-fit, 288px)',
        }}
      >
        {items.slice(0, 10).map((media, i) => (
          <Media key={i} media={media} />
        ))}
      </div>
    </div>
  )
}
