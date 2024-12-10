import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export async function confirmRedirectFrom(...paths: string[]) {
  const headersList = await headers()
  const referer = headersList.get('referer')
  console.log('Redirected from', referer)
  // FIXME: check should work independent of env
  const isValidReferer = paths.some((path) =>
    referer?.startsWith(`${process.env.FRONTEND_URL}${path}`),
)
  if (!isValidReferer) redirect('/auth')
}
