import FullWidthBackdrop from '@/components/FullWidthBackdrop'
import type { Metadata } from 'next'
import Season from './Season'
import { DetailsParams, fetchDetails } from '@/utils/fetchDetails'

export async function generateMetadata({
  params,
}: {
  params: Promise<DetailsParams>
}): Promise<Metadata> {
  const details = await fetchDetails(params)
  if (!details) return {}

  const { media } = details

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
  const details = await fetchDetails(params)
  if (!details) return <p>Resource not found</p>

  const { media, id } = details

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
          <Season key={i} season={season} series_id={id} />
        ))}
      </div>
    </>
  )
}
