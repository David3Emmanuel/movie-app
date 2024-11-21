import isLoggedIn from '@/utils/isLoggedIn'
import MainHeader from './MainHeader'
import { redirect } from 'next/navigation'

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!(await isLoggedIn())) redirect('/auth')
  return (
    <>
      <MainHeader />
      {children}
    </>
  )
}
