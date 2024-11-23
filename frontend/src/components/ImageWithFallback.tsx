'use client'

import Image, { type ImageProps } from 'next/image'
import { useState } from 'react'

export default function ImageWithFallback({
  src,
  alt,
  children,
  ...props
}: ImageProps & { children?: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  return hasError ? (
    children
  ) : (
    <Image src={src} alt={alt} onError={() => setHasError(true)} {...props} />
  )
}
