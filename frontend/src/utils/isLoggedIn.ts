import { cookies } from 'next/headers'

export default async function isLoggedIn() {
  return Boolean((await cookies()).get('access_token'))
}
