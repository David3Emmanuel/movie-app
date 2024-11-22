import { ImageWithSrc } from '@project/tmdb/types/image.types'
import { MultiDTO } from '@project/tmdb/types/search.types'
import Image from 'next/image'
import 'tailwindcss/tailwind.css'
import Button from '@/components/Button'
import { MediaType } from '@project/tmdb'

export default async function FullWidthBackdrop({
  media,
}: {
  media: MultiDTO
}) {
  const res = await fetch(
    `${process.env.BACKEND_URL}/moviedb/image?id=${media.id}&type=${media.media_type}&image_type=backdrop`,
  )
  const backdrops = (await res.json()) as ImageWithSrc[]
  const imageSrc = backdrops[0].src

  const type = 'title' in media ? MediaType.Movie : MediaType.TV
  const title = 'title' in media ? media.title : media.name

  let logoSrc: string | null = null
  try {
    const res = await fetch(
      `${process.env.BACKEND_URL}/moviedb/image?id=${media.id}&type=${type}&image_type=logo`,
    )
    const logos = (await res.json()) as ImageWithSrc[]
    logoSrc = logos[0].src
  } catch (err) {
    console.error(err)
  }

  return (
    <div className='w-full md:aspect-video min-h-[50vh] xs:max-h-[90vh] relative flex items-end'>
      <Image src={imageSrc} alt={title} fill className='-z-10 object-cover' />
      <div className='absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent' />
      <div className='w-full xs:w-3/4 max-w-2xl lg:max-h-[75%] aspect-video z-10 mx-auto md:mx-4 mt-20 mb-0 text-white md:text-neutral-300 md:bg-neutral-600/50 p-4 rounded'>
        {logoSrc ? (
          <div className='relative w-full h-20 my-4'>
            <Image
              src={logoSrc}
              alt={title}
              fill
              className='object-contain object-left'
            />
          </div>
        ) : (
          <h1 className='text-5xl font-extrabold mb-8'>{title}</h1>
        )}
        <p className='line-clamp-3'>{media.overview}</p>
        <div className='flex mt-10 gap-5 items-center flex-wrap justify-center md:justify-start'>
          <Button className='rounded-full w-32 xs:w-40 max-xs:text-sm'>
            Play
          </Button>
          <Button className='rounded-full w-32 xs:w-40 nobg border border-white max-xs:text-sm'>
            More info
          </Button>
        </div>
      </div>
    </div>
  )
}
