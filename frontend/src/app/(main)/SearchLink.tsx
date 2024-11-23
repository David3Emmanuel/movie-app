'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SearchLink() {
  const pathname = usePathname()
  if (pathname === '/search') return null

  return (
    <Link href='/search' className='hidden xs:block'>
      Search
    </Link>
  )
}
