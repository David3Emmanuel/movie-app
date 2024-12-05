import type { EpisodeWithImageDTO } from '@project/tmdb/types/tv.types'
import Image from 'next/image'

export default function Episode({ episode }: { episode: EpisodeWithImageDTO }) {
  return (
    <div className='rounded-lg bg-neutral-800 w-56 aspect-[3/4] p-1 overflow-hidden relative'>
      <div className='w-full rounded-lg aspect-video relative overflow-hidden'>
        <Image
          src={episode.image_src}
          alt={episode.name}
          fill
          className='object-cover'
        />
      </div>
      <h2 className='font-medium mt-1 mb-2'>{episode.name}</h2>
      <p className='text-sm text-neutral-400'>{episode.overview}</p>
      <div className='absolute left-0 bottom-0 right-0 bg-gradient-to-t from-neutral-800 to-transparent h-1/4' />
    </div>
  )
}
