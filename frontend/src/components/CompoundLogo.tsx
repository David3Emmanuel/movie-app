import logo from '@/app/icon.svg'
import Image from 'next/image'

export default function CompoundLogo() {
  return (
    <div className='flex items-center gap-0.5'>
      <Image src={logo} alt='logo' width={36} />
      <h2 className='uppercase text-sm font-bold'>PLAYCINE</h2>
    </div>
  )
}
