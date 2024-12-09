import type { Metadata } from 'next'
import Catalogue from '../Catalogue'
import Input from '@/components/Input'
import MediaRow from '@/components/MediaRow'
import { ImageType } from '@project/backend/src/moviedb/moviedb.dto'

export const metadata: Metadata = {
  title: 'Search',
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  return (
    <>
      <form className='w-full max-w-3xl mx-auto my-28'>
        <Input
          name='q'
          placeholder='What are you looking for?'
          className='rounded-full'
          innerClassName='bg-[#3A3A3A] rounded-full text-lg placeholder:text-[#9C9C9C] p-3'
          overrideInnerStyles
          defaultValue={q}
        />
        {/* IDEA add genres */}
      </form>
      {q ? (
        <MediaRow
          title={`Search results for "${q}"`}
          mediaItems={`${process.env.BACKEND_URL}/moviedb/search?query=${q}`}
          imageType={ImageType.Poster}
        />
      ) : (
        <Catalogue />
      )}
    </>
  )
}
