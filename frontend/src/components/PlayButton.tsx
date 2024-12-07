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
  return (
    <Button
      className={`rounded-full w-32 xs:w-40 max-xs:text-sm ${className || ''}`}
    >
      Play
    </Button>
  )
}
