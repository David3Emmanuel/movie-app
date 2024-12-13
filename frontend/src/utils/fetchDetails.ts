import { MediaType } from '@project/tmdb'
import type {
  TVSeriesDetailsDTO,
  MovieDetailsDTO,
  DetailsErrorDTO,
} from '@project/tmdb/types/details.types'

export interface DetailsParams {
  id: string
  names?: string[]
}

export async function fetchDetails(
  params: Promise<DetailsParams> | DetailsParams,
) {
  const { id: type_id } = await params
  const [type, id] = type_id.split('-') as [MediaType, string]

  const res = await fetch(
    `${process.env.BACKEND_URL}/moviedb/details/?id=${id}&type=${type}`,
  )
  const data = (await res.json()) as
    | TVSeriesDetailsDTO
    | MovieDetailsDTO
    | DetailsErrorDTO
  if ('success' in data) return null

  return { media: data, type, id: parseInt(id) }
}
