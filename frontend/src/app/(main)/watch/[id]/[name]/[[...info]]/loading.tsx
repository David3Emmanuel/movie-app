'use client'

import { useState, useEffect } from 'react'

export default function LoadingWatchPage() {
  const [showMessage, setShowMessage] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 10000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      <p className='text-2xl'>Loading...</p>
      {showMessage && <p className='mt-2'>This might take a while...</p>}
    </div>
  )
}
