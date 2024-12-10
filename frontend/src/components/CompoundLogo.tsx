import logo from '@/app/icon-flat.svg'
import Image from 'next/image'
import Link from 'next/link'

export default function CompoundLogo() {
  return (
    <Link href='/' className='flex items-center gap-0.5'>
      <Image src={logo} alt='logo' width={36} />
      <h2 className='uppercase text-sm font-bold'>PLAYCINE</h2>
    </Link>
  )
}
