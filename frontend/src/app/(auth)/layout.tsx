import CompoundLogo from '@/components/CompoundLogo'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className='flex p-4 xs:px-16'>
        <CompoundLogo />
      </header>
      <main className='p-4 xs:px-16'>
        <h1 className='text-3xl xs:text-4xl md:text-5xl font-bold text-center'>
          Unlock a world of endless entertainment
        </h1>
        <h3 className='mt-1 text-center font-semibold xs:text-xl md:text-2xl'>
          Login to Discover, Stream, and Enjoy!
        </h3>
        {children}
      </main>
    </>
  )
}
