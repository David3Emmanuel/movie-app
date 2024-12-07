'use client'

import { useState } from 'react'
import type { EpisodeWithImageDTO } from '@project/tmdb/types/tv.types'
import Image from 'next/image'
import PlayButton from '@/components/PlayButton'

export default function Episode({ episode }: { episode: EpisodeWithImageDTO }) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <div
        className='rounded-lg hover:scale-105 cursor-pointer bg-neutral-800 w-56 aspect-[3/4] p-1 overflow-hidden relative'
        onClick={() => setShowDetails(true)}
      >
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
      {showDetails && (
        <EpisodeDetails
          episode={episode}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  )
}

function EpisodeDetails({
  episode,
  onClose,
}: {
  episode: EpisodeWithImageDTO
  onClose: () => void
}) {
  return (
    <div
      className='fixed top-0 bottom-0 right-0 left-0 bg-black/50 z-50 flex items-center justify-center'
      onClick={onClose}
    >
      <div
        className='bg-neutral-800 p-4 rounded-lg w-[90vw] max-w-lg max-h-[90vh] aspect-square overflow-y-auto relative'
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className='absolute top-4 left-4 text-white text-5xl font-light z-10'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='w-full rounded-lg aspect-video relative overflow-hidden'>
          <Image
            src={episode.image_src}
            alt={episode.name}
            fill
            className='object-cover'
          />
        </div>
        <PlayButton className='mx-auto py-3 -translate-y-1/2' media={episode} />
        <p className='text-neutral-400 -mt-5'>
          Episode {episode.episode_number}
        </p>
        <h2 className='text-xl font-medium mb-3'>{episode.name}</h2>
        <p className='text-neutral-400'>{episode.overview}</p>
      </div>
    </div>
  )
}
