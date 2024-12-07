'use client'

import { useParams } from 'next/navigation'

import type {
  MovieDetailsDTO,
  TVSeriesDetailsDTO,
} from '@project/tmdb/types/details.types'
import type { MultiDTO } from '@project/tmdb/types/search.types'
import type { EpisodeWithImageDTO } from '@project/tmdb/types/tv.types'

import Button from '@/components/Button'

export default function PlayButton({
  className,
  media,
}: {
  className?: string
  media: EpisodeWithImageDTO | MultiDTO | MovieDetailsDTO | TVSeriesDetailsDTO
}) {
  const { id: type_id, names } = useParams<{ id: string; names: string[] }>()

  let info: string | undefined
  if ('season_number' in media) {
    const season = media.season_number.toString().padStart(2, '0')
    const episode = media.episode_number.toString().padStart(2, '0')
    info = `S${season}E${episode}`
  }

  return (
    <Button
      href={
        type_id
          ? `/watch/${type_id}/${names.join('/')}/${info || ''}`
          : undefined
      }
      className={`rounded-full w-32 xs:w-40 max-xs:text-sm ${className || ''}`}
    >
      Play
    </Button>
  )
}
