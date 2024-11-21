import Button from '@/components/Button'
import Input from '@/components/Input'
import { redirect } from 'next/navigation'
import React, { ReactElement } from 'react'

export default async function AuthForm<T extends Record<string, string>>({
  id,
  title,
  children,
  email,
  submitText,
  action,
}: {
  id: string
  title?: string
  email?: string
  submitText?: string
  action?: (formData: T) => void | string | Promise<void | string>
  children?: React.ReactNode
}) {
  // FIXME add form validation
  // FIXME handle errors

  const handleSubmit = async (formData: FormData) => {
    'use server'
    if (action) {
      const url = await action(Object.fromEntries(formData) as T)
      if (url) redirect(url)
    }
  }

  return (
    <form
      action={handleSubmit}
      id={id}
      className='w-full mt-5 max-w-lg mx-auto flex flex-col gap-3 xs:px-6 py-6 xs:bg-neutral-800 rounded-md'
    >
      {title && (
        <h1 className='text-3xl font-bold text-center xs:mb-6'>{title}</h1>
      )}
      <Input
        required
        type='email'
        name='email'
        idPrefix={id}
        placeholder='example@gmail.com'
        label='Email'
        defaultValue={email}
        readOnly={Boolean(email)}
      />
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          (child as ReactElement).type === Input
        ) {
          return React.cloneElement(child as ReactElement, { idPrefix: id })
        }
        return child
      })}
      <Button className='w-full p-2 mt-5'>
        {submitText || title || 'Continue'}
      </Button>
      {/* IDEA remember me */}
      {/* IDEA forgot password */}
    </form>
  )
}
