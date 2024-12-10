'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'

export default function Button({
  href,
  onClick,
  children,
  className,
  ...elementProps
}: {
  href?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const [loading, setLoading] = useState(false)
  const formStatus = useFormStatus()
  const combinedClassName = `button ${className || ''}`.trim()

  const handleClick = async () => {
    if (onClick) {
      setLoading(true)
      try {
        await onClick()
      } finally {
        setLoading(false)
      }
    }
  }

  if (href) {
    return (
      <a
        href={href}
        onClick={handleClick}
        className={combinedClassName}
        {...elementProps}
      >
        {loading || formStatus.pending ? 'Loading...' : children}
      </a>
    )
  }

  return (
    <button
      onClick={handleClick}
      className={combinedClassName}
      {...elementProps}
    >
      {loading || formStatus.pending ? 'Loading...' : children}
    </button>
  )
}
