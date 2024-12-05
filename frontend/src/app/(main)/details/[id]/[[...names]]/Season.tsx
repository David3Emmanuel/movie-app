import { SeasonInfo } from '@project/tmdb/types/details.types'

export default function Season({ season }: { season: SeasonInfo }) {
  return (
    <div className='lg:border-t mt-3 border-dashed border-white lg:flex gap:4'>
      <div className='py-3 lg:w-1/4'>
        <h2 className='text-xl font-semibold mb-2'>{season.name}</h2>
        <p>{season.overview}</p>
      </div>
    </div>
  )
}
