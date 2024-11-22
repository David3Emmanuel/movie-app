import Media from '@/components/Media'
import type { MediaDTO } from '@project/tmdb/types/search.types'

export default function MediaRow({
  title,
  mediaItems,
}: {
  title: string
  mediaItems: MediaDTO[]
}) {
  return (
    <div className='pl-4 pb-8'>
      <h2 className='text-xl font-semibold mt-3 mb-2'>{title}</h2>
      <div className='flex overflow-x-hidden gap-4'>
        {mediaItems.map((media, i) => (
          <Media key={i} media={media} />
        ))}
      </div>
    </div>
  )
}
