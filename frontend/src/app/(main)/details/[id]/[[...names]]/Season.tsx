import { DetailsErrorDTO, SeasonInfo } from '@project/tmdb/types/details.types'
import type { SeasonDetailsWithImagesDTO } from '@project/tmdb/types/tv.types'
import { Suspense } from 'react'
import Episode from './Episode'

export default function Season({
  series_id,
  season,
}: {
  series_id: number
  season: SeasonInfo
}) {
  return (
    <div className='lg:border-t mt-3 border-dashed border-white lg:flex gap:4'>
      <div className='py-3 lg:w-1/4'>
        <h2 className='text-xl font-semibold mb-2'>{season.name}</h2>
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
      className='grid gap-4 flex-1 py-3'
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
