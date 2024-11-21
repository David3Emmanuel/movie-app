import Button from '@/components/Button'
import LandingHeader from './LandingHeader'
import isLoggedIn from '@/utils/isLoggedIn'
import { redirect } from 'next/navigation'

export default async function LandingPage() {
  if (await isLoggedIn()) redirect('/home')

  return (
    <>
      <LandingHeader />
      <main className='px-4 xs:px-16 pt-12'>
        <h1 className='text-3xl xs:text-4xl sm:text-5xl leading-tight font-semibold text-center'>
          Discover Unlimited Movies and TV Shows
        </h1>
        {/* IDEA add subheading */}
        {/* IDEA background images */}
        {/* IDEA movie posters */}
        <Button className='mx-auto my-10 rounded-full' href='/auth'>
          Discover PLAYCINE
        </Button>
      </main>
    </>
  )
}
