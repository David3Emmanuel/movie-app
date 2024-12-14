'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SearchLink({ show }: { show?: boolean }) {
  const pathname = usePathname()
  if (pathname === '/search') return null

  return (
    <Link href='/search' className={show ? 'text-xl' : 'hidden xs:block'}>
      Search
    </Link>
  )
}
