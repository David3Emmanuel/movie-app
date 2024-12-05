import FullWidthBackdrop from '@/components/FullWidthBackdrop'
import type {
  DetailsErrorDTO,
  MovieDetailsDTO,
  TVSeriesDetailsDTO,
} from '@project/tmdb/types/details.types'
import type { Metadata } from 'next'
import Season from './Season'

interface DetailsParams {
  id: string
  names?: string[]
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DetailsParams>
}): Promise<Metadata> {
  const media = await fetchDetails(params)
  if (!media) return {}

  const title = 'title' in media ? media.title : media.name
  return {
    title: {
      absolute: `${title} - Watch on PLAYCINE`,
    },
    description: media.overview,
  }
}

export default async function DetailsPage({
  params,
}: {
  params: Promise<DetailsParams>
}) {
  const media = await fetchDetails(params)
  if (!media) return <p>Resource not found</p>

  const seasons =
    'seasons' in media
      ? media.seasons.toSorted((a, b) => a.season_number - b.season_number)
      : []
  if (seasons.length > 0 && seasons[0].season_number === 0) {
    const specialSeason = seasons.shift()!
    seasons.push(specialSeason)
  }
  // TODO add rating buttons
  // TODO fetch recommended movies

  return (
    <>
      <FullWidthBackdrop media={media} withDetails />
      <div className='p-4'>
        <h2 className='text-3xl font-semibold mt-3 mb-2 text-neutral-300'>
          {'title' in media ? media.title : media.name}
        </h2>
        <h3 className='text-xl font-medium mt-2 mb-1 text-neutral-300'>
          Overview
        </h3>
        <p>{media.overview}</p>
        {seasons.map((season, i) => (
          <Season key={i} season={season} />
        ))}
      </div>
    </>
  )
}

async function fetchDetails(params: Promise<DetailsParams>) {
  const { id: type_id } = await params
  const [type, id] = type_id.split('-')

  const res = await fetch(
    `${process.env.BACKEND_URL}/moviedb/details/?id=${id}&type=${type}`,
  )
  const data = (await res.json()) as
    | TVSeriesDetailsDTO
    | MovieDetailsDTO
    | DetailsErrorDTO
  if ('success' in data) return null

  return data
}
