import Input from '@/components/Input'
import AuthForm from '../AuthForm'
import { confirmRedirectFrom } from '../confirmRedirectFrom'
import { cookies } from 'next/headers'

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>
}) {
  await confirmRedirectFrom('/auth', '/signup')
  const { email } = await searchParams

  async function login(formData: { email: string; password: string }) {
    'use server'

    const res = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json()

    if (res.status === 401) {
      console.error(data.message)
    } else {
      const _cookies = await cookies()
      _cookies.set('access_token', data.access_token)
      return '/'
    }
  }

  return (
    <AuthForm id='sign-in' title='Sign In' email={email} action={login}>
      <Input
        name='password'
        type='password'
        placeholder='*****'
        label='Password'
        required
      />
    </AuthForm>
  )
}
