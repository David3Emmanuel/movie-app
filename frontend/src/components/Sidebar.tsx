'use client'

import { useState } from 'react'

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='xs:hidden'>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : '☰'}
      </button>
      {isOpen && (
        <>
          <div
            className='fixed inset-0 bg-black/50 z-50'
            onClick={() => setIsOpen(false)}
          />
          <div className='p-4 fixed top-0 right-0 h-full w-3/4 bg-neutral-800 shadow-lg z-50 flex flex-col items-stretch gap-6'>
            {children}
          </div>
        </>
      )}
    </div>
  )
}
