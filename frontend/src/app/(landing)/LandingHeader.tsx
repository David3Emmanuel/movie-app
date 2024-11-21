import Button from '@/components/Button'
import CompoundLogo from '@/components/CompoundLogo'
import { redirect } from 'next/navigation'
import { cookies as _cookies } from 'next/headers'

export default async function LandingHeader() {
  const cookies = await _cookies()
  const username = cookies.get('username')?.value

  async function handleLogout() {
    'use server'
    const cookies = await _cookies()
    cookies.delete('access_token')
    redirect('/')
  }

  return (
    <header className='flex p-4 xs:px-16 justify-between'>
      <CompoundLogo />
      <div className='flex gap-4'>
        {username ? (
          <Button className='hidden xs:flex nobg w-24 p-2 rounded-full text-xs'>
            {username}
          </Button>
        ) : (
          <Button
            href='/auth'
            className='hidden xs:flex nobg w-24 p-2 rounded-full text-xs'
          >
            Sign In
          </Button>
        )}
        {username ? (
          <Button
            className='text-neutral-700 bg-white hover:bg-neutral-200 active:bg-neutral-300 w-24 p-2 rounded-full text-xs'
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            href='/auth'
            className='text-neutral-700 bg-white hover:bg-neutral-200 active:bg-neutral-300 w-24 p-2 rounded-full text-xs'
          >
            Join
          </Button>
        )}
      </div>
    </header>
  )
}
