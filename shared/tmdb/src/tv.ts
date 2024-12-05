import { DetailsErrorDTO } from './details.types'
import type {
  SeasonDetailsDTO,
  EpisodeWithImageDTO,
  SeasonDetailsWithImagesDTO,
} from './tv.types'
import { extendFetch } from './utils/fetch'
import { getImageSrc } from './image'

export async function fetchSeasonDetails(
  apiKey: string,
  series_id: number,
  season: number,
): Promise<SeasonDetailsWithImagesDTO | DetailsErrorDTO> {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/${series_id}/season/${season}`,
  )
  url.searchParams.append('api_key', apiKey)
  const seasonDetails = await extendFetch<SeasonDetailsDTO | DetailsErrorDTO>(
    url,
  )

  if ('success' in seasonDetails) {
    return seasonDetails
  }

  const episodesWithImages: EpisodeWithImageDTO[] = seasonDetails.episodes.map(
    (episode) => ({
      ...episode,
      image_src: getImageSrc(episode.still_path),
    }),
  )

  return {
    ...seasonDetails,
    episodes: episodesWithImages,
  }
}
