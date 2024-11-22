import Button from '@/components/Button'
import CompoundLogo from '@/components/CompoundLogo'
import { redirect } from 'next/navigation'
import { cookies as _cookies } from 'next/headers'
import Link from 'next/link'

export default async function MainHeader() {
  const cookies = await _cookies()
  const username = cookies.get('username')?.value

  async function handleLogout() {
    'use server'
    const cookies = await _cookies()
    cookies.delete('access_token')
    redirect('/')
  }

  return (
    <header className='flex p-4 font-semibold justify-between gap-8 fixed top-0 left-0 right-0 z-20'>
      <CompoundLogo />
      {/* IDEA indicate active link */}
      <div className='flex gap-4 items-center'>
        <Link href='/home' className='hidden xs:block'>
          Home
        </Link>
      </div>
      <div className='flex gap-4 flex-1 justify-end'>
        {username ? (
          <Button className='hidden xs:flex nobg min-w-24 px-6 py-2 rounded-full hover:text-neutral-700'>
            {username}
          </Button>
        ) : (
          <Button
            href='/auth'
            className='hidden xs:flex nobg min-w-24 px-6 py-2 rounded-full hover:text-neutral-700'
          >
            Sign In
          </Button>
        )}
        <Button
          className='text-neutral-700 bg-white hover:bg-neutral-200 active:bg-neutral-300 w-24 p-2 rounded-full text-sm'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  )
}
