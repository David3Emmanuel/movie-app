import Button from '@/components/Button'
import CompoundLogo from '@/components/CompoundLogo'

export default function LandingHeader() {
  return (
    <header className='flex p-4 xs:px-16 justify-between'>
      <CompoundLogo />
      <div className='flex gap-4'>
        <Button className='hidden xs:flex nobg w-24 p-2 rounded-full text-xs'>
          Sign In
        </Button>
        <Button className='text-neutral-700 bg-white hover:bg-neutral-200 active:bg-neutral-300 w-24 p-2 rounded-full text-xs'>
          Join
        </Button>
      </div>
    </header>
  )
}
