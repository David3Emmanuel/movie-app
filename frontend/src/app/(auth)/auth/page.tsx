import AuthForm from '../AuthForm'

export default function AuthPage() {
  async function checkUser({ email }: { email: string }) {
    'use server'

    const res = await fetch(
      `${process.env.BACKEND_URL}/users/check?email=${email}`,
    )
    const data = await res.json()
    return data ? `/login?email=${email}` : `/signup?email=${email}`
  }

  return (
    <AuthForm
      id='auth'
      action={checkUser}
      title='Sign in'
      submitText='Continue'
    ></AuthForm>
  )
}
