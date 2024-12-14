'use server'
import { cookies } from 'next/headers'

export async function getAccessToken() {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('access_token')?.value
  if (!accessToken) {
    throw new Error('No access token found')
  }
  return accessToken
}
