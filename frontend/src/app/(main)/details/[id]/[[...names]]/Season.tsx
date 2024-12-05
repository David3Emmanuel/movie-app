import { DetailsErrorDTO, SeasonInfo } from '@project/tmdb/types/details.types'
import type { SeasonDetailsWithImagesDTO } from '@project/tmdb/types/tv.types'
import { Suspense } from 'react'
import Episode from './Episode'
import Link from 'next/link'

export default function Season({
  series_id,
  season,
}: {
  series_id: number
  season: SeasonInfo
}) {
  const permalinkId =
    season.season_number === 0 ? 'specials' : `s${season.season_number}`
  return (
    <div className='lg:border-t mt-3 border-dashed border-white lg:flex gap:4'>
      <div className='py-3 lg:w-1/4'>
        <Link
          id={permalinkId}
          href={`#${permalinkId}`}
          className='text-xl font-semibold mb-3'
        >
          {season.name}
        </Link>
        <p>{season.overview}</p>
      </div>
      <Suspense fallback='Loading...'>
        <Episodes season_number={season.season_number} series_id={series_id} />
      </Suspense>
    </div>
  )
}

async function Episodes({
  season_number,
  series_id,
}: {
  season_number: number
  series_id: number
}) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/moviedb/details/?id=${series_id}&type=tv&season=${season_number}`,
  )
  const data = (await res.json()) as
    | SeasonDetailsWithImagesDTO
    | DetailsErrorDTO
  if ('success' in data) return null

  const seasonDetails = data

  return (
    <div
      className='grid gap-4 flex-1 py-3 justify-center'
      style={{
        gridTemplateColumns: 'repeat(auto-fill, 14rem)',
      }}
    >
      {seasonDetails.episodes.map((episode, i) => (
        <Episode key={i} episode={episode} />
      ))}
    </div>
  )
}
