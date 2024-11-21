import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value
  if (token) {
    const username = req.cookies.get('username')?.value
    const email = req.cookies.get('email')?.value
    const userId = req.cookies.get('user_id')?.value

    if (!(username && email && userId)) {
      const res = await fetch(`${process.env.BACKEND_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data.statusCode === 401) {
        const response = NextResponse.next()
        response.cookies.delete('access_token')
        response.cookies.delete('username')
        response.cookies.delete('email')
        response.cookies.delete('user_id')
        return response
      } else {
        const { username, email, _id: userId } = data

        const response = NextResponse.next()
        response.cookies.set('username', username)
        response.cookies.set('email', email)
        response.cookies.set('user_id', userId)
        return response
      }
    }
  } else {
    const response = NextResponse.next()
    response.cookies.delete('username')
    response.cookies.delete('email')
    response.cookies.delete('user_id')
    return response
  }
  return NextResponse.next()
}
