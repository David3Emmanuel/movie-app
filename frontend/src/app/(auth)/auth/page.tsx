import AuthForm from '../AuthForm'

export default function AuthPage() {
  async function checkUser({ email }: { email: string }) {
    'use server'

    const res = await fetch(
      `${process.env.BACKEND_URL}/users/check?email=${email}`,
    )
    try {
      const data = await res.json()
      return data.result ? `/login?email=${email}` : `/signup?email=${email}`
    } catch (e) {
      console.error(e)
    }
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
