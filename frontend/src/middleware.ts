import { NextRequest, NextResponse } from 'next/server'
import { fetchWithAuth } from './utils/fetchWithAuth'

function setUserCookies(
  response: NextResponse,
  username: string,
  email: string,
  userId: string,
) {
  response.cookies.set('username', username)
  response.cookies.set('email', email)
  response.cookies.set('user_id', userId)
}

function deleteUserCookies(response: NextResponse) {
  response.cookies.delete('username')
  response.cookies.delete('email')
  response.cookies.delete('user_id')
}

export async function middleware(req: NextRequest) {
  const response = NextResponse.next()
  const token = req.cookies.get('access_token')?.value
  if (token) {
    const username = req.cookies.get('username')?.value
    const email = req.cookies.get('email')?.value
    const userId = req.cookies.get('user_id')?.value

    if (!(username && email && userId)) {
      const res = await fetchWithAuth(`${process.env.BACKEND_URL}/users/me`)
      const data = await res.json()
      if (data.statusCode === 401) {
        response.cookies.delete('access_token')
        deleteUserCookies(response)
      } else {
        const { username, email, _id: userId } = data
        setUserCookies(response, username, email, userId)
      }
    }
  } else {
    deleteUserCookies(response)
  }

  return response
}
