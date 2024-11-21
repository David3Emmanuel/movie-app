import Input from '@/components/Input'
import AuthForm from '../AuthForm'
import { confirmRedirectFrom } from '../confirmRedirectFrom'

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>
}) {
  await confirmRedirectFrom('/auth', '/signup')
  const { email } = await searchParams

  async function signup(formData: {
    email: string
    username: string
    password: string
  }) {
    'use server'

    console.log(formData)

    const res = await fetch(`${process.env.BACKEND_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    const data = await res.json()
    console.log(data)

    if (!data.error && data.message.toLowerCase() === 'success')
      return `/login?email=${email}`
    return `/signup?email=${email}`
  }

  return (
    <AuthForm id='sign-up' title='Sign Up' email={email} action={signup}>
      <Input name='username' placeholder='Username' label='Username' />
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
