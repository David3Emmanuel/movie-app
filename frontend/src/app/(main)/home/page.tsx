import { Metadata } from 'next'
import type { MultiDTO } from '@project/tmdb/types/search.types'
import MediaRow from '@/components/MediaRow'
import FullWidthBackdrop from '@/components/FullWidthBackdrop'

export const metadata: Metadata = {
  title: 'Home',
}

export default async function HomePage() {
  try {
    const res = await fetch(`${process.env.BACKEND_URL}/moviedb/trending`)
    const trending = (await res.json()) as MultiDTO[]

    const firstMedia = trending.shift()

    return (
      <>
        {firstMedia && <FullWidthBackdrop media={firstMedia} />}
        <MediaRow title='Trending Now' mediaItems={trending} />
      </>
    )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    console.error(err)
    return (
      <div className='flex h-full w-full items-center justify-center'>
        Something went wrong. Try refreshing the page.
      </div>
    )
  }
}
