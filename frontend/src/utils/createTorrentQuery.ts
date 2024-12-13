import { MediaType } from '@project/tmdb'
import {
  TVSeriesDetailsDTO,
  MovieDetailsDTO,
} from '@project/tmdb/types/details.types'

export default function createTorrentQuery(
  details: {
    media: TVSeriesDetailsDTO | MovieDetailsDTO
    type: string
    id: number
  },
  info: string[],
) {
  const searchDetails: Partial<{
    name: string
    season: number
    episode: number
  }> = {}

  const { media, type } = details
  if (type === MediaType.Movie) {
    if (!('title' in media)) return null
    searchDetails.name = media.title
  } else {
    if (!('name' in media)) return null
    searchDetails.name = media.name

    const season_episode = info[0]
    const pattern = /S(\d+)E(\d+)/
    const match = season_episode.match(pattern)
    if (match) {
      searchDetails.season = parseInt(match[1])
      searchDetails.episode = parseInt(match[2])
    } else {
      return null
    }
  }

  const season = searchDetails.season?.toString().padStart(2, '0')
  const episode = searchDetails.episode?.toString().padStart(2, '0')

  const combined_season_episode = []
  if (season) combined_season_episode.push(`S${season}`)
  if (episode) combined_season_episode.push(`E${episode}`)

  const searchQuery = `${searchDetails.name} ${combined_season_episode.join(
    ' ',
  )}`.trim()

  return searchQuery
}
