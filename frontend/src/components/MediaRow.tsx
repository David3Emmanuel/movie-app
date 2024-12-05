import Media, { MediaFallback } from '@/components/Media'
import type { MediaDTO } from '@project/tmdb/types/search.types'
import { ImageType } from '@project/backend/dist/moviedb/moviedb.dto'
import { Suspense } from 'react'
import type { MediaItem } from '@project/backend/dist/schemas/user.schema'
import type {
  MovieDetailsDTO,
  TVSeriesDetailsDTO,
} from '@project/tmdb/types/details.types'

interface MediaRowProps {
  title: string
  mediaItems: MediaDTO[] | MediaItem[] | string
  imageType?: ImageType
}

export default function MediaRow(props: MediaRowProps) {
  return (
    <Suspense fallback={<MediaRowFallback {...props} />}>
      <_MediaRow {...props} />
    </Suspense>
  )
}

async function _MediaRow({ title, mediaItems, imageType }: MediaRowProps) {
  let items: (MediaDTO | MovieDetailsDTO | TVSeriesDetailsDTO)[]
  if (typeof mediaItems === 'string') {
    const res = await fetch(mediaItems)
    items = await res.json()
  } else
    items = await Promise.all(
      mediaItems.map((item) => {
        if ('type' in item) {
          return fetch(
            `${process.env.BACKEND_URL}/moviedb/details?type=${item.type}&id=${item.id}`,
          )
            .then((res) => res.json())
            .then((data) => {
              if ('success' in data) throw data
              return data as MovieDetailsDTO | TVSeriesDetailsDTO
            })
        } else return item
      }),
    )

  return (
    <div className='pl-4 pb-8'>
      <h2 className='text-xl font-semibold mt-3 mb-2'>{title}</h2>
      <div
        className='grid gap-4 w-full justify-evenly'
        style={
          imageType === ImageType.Poster
            ? {
                gridTemplateColumns: 'repeat(auto-fit, 12rem)',
              }
            : {
                width: 'calc(100% + 18rem)',
                gridTemplateColumns: 'repeat(auto-fit, 288px)',
              }
        }
      >
        {items.slice(0, 10).map((media, i) => (
          <Media key={i} media={media} imageType={imageType} />
        ))}
      </div>
    </div>
  )
}

function MediaRowFallback({
  title,
  imageType,
}: {
  title: string
  imageType?: ImageType
}) {
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
        {Array(5).map((_, i) => (
          <MediaFallback key={i} imageType={imageType} />
        ))}
      </div>
    </div>
  )
}
