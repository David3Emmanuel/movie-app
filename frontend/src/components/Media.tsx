import { MediaType } from '@project/tmdb'
import { ImageWithSrc } from '@project/tmdb/types/image.types'
import type { MediaDTO } from '@project/tmdb/types/search.types'
import ImageWithFallback from './ImageWithFallback'
import { ImageType } from '@project/backend/src/moviedb/moviedb.dto'
import assert from 'assert'
import Link from 'next/link'
import formatTitle from '@/utils/formatTitle'
import type {
  MovieDetailsDTO,
  TVSeriesDetailsDTO,
} from '@project/tmdb/types/details.types'

export default async function Media({
  media,
  imageType,
}: {
  media: MediaDTO | MovieDetailsDTO | TVSeriesDetailsDTO
  imageType?: ImageType
}) {
  const type = 'title' in media ? MediaType.Movie : MediaType.TV
  assert(imageType !== ImageType.Logo)

  let imageSrc: string | null = null
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/moviedb/image?id=${
        media.id
      }&type=${type}&image_type=${imageType || 'backdrop'}`,
    )
    const backdrops = (await res.json()) as ImageWithSrc[]
    imageSrc = backdrops[0].src
  } catch (err) {
    console.error(err)
  }

  let logoSrc: string | null = null
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/moviedb/image?id=${media.id}&type=${type}&image_type=logo`,
    )
    const logos = (await res.json()) as ImageWithSrc[]
    if (logos.length > 0) logoSrc = logos[0].src
  } catch (err) {
    console.error(err)
  }

  const title = 'title' in media ? media.title : media.name
  return (
    <div className='w-fit h-fit'>
      <Link
        href={`/details/${type}-${media.id}/${formatTitle(title)}`}
        className={`${imageType === ImageType.Poster ? 'w-48' : 'w-72'} ${
          imageType === ImageType.Poster ? 'aspect-[2/3]' : 'aspect-video'
        } relative rounded-lg overflow-hidden shrink-0 bg-neutral-600 flex items-end`}
      >
        {imageSrc && <ImageWithFallback src={imageSrc} alt={title} fill />}
        {logoSrc ? (
          <div className='m-2 h-10 w-full relative'>
            <ImageWithFallback
              src={logoSrc}
              alt={title}
              fill
              className='object-contain object-bottom'
            >
              <h3 className='text-lg font-bold m-1 w-full truncate bg-neutral-600/5 p-1 rounded'>
                {title}
              </h3>
            </ImageWithFallback>
          </div>
        ) : (
          <h3 className='text-lg font-bold m-1 w-full truncate bg-neutral-600/5 p-1 rounded'>
            {title}
          </h3>
        )}
      </Link>
      <h3 className='text-lg font-bold my-1'>{title}</h3>
    </div>
  )
}

export function MediaFallback({ imageType }: { imageType?: ImageType }) {
  return (
    <div
      className={`${imageType === ImageType.Poster ? 'w-48' : 'w-72'} ${
        imageType === ImageType.Poster ? 'aspect-[2/3]' : 'aspect-video'
      } relative rounded-lg overflow-hidden shrink-0 bg-neutral-600 flex items-end`}
    />
  )
}
