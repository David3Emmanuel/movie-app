'use client'

import { TorrentInfo } from '@project/backend/src/media/processResults'
import { useState } from 'react'
import Button from '@/components/Button'

export default function Player({
  torrents,
  addToHistory,
}: {
  torrents: TorrentInfo[]
  addToHistory: () => void
}) {
  const [source, _setSource] = useState<TorrentInfo | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  function setSource(source: TorrentInfo) {
    _setSource(source)
    addToHistory()
  }

  return (
    <div className='pt-16 flex flex-col items-center justify-center h-screen overflow-y-auto'>
      {source ? (
        <div className='portrait:w-full landscape:h-full aspect-video mx-auto my-auto'>
          <video controls className='object-contain w-full h-full'>
            <source
              src={`${
                process.env.NEXT_PUBLIC_STREAM_URL
              }?magnet=${encodeURIComponent(source.link)}`}
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <Sources torrents={torrents} setSource={setSource} />
      )}
      <Button
        className='fixed top-16 left-4 outlined'
        onClick={() => setIsModalOpen(true)}
      >
        Show Source Info
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className='text-xl font-bold'>Torrent Info</h2>
          {source && (
            <>
              <p className='my-5'>Name: {source.dn}</p>
              <p className='break-all'>Magnet Link: {source.link}</p>
            </>
          )}
        </Modal>
      )}
    </div>
  )
}

function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode
  onClose: () => void
}) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center max-h-full overflow-y-auto'>
      <div className='bg-neutral-800 p-4 rounded'>
        <Button className='outlined py-2 mb-2' onClick={onClose}>
          Close
        </Button>
        {children}
      </div>
    </div>
  )
}

function Sources({
  torrents,
  setSource,
}: {
  torrents: TorrentInfo[]
  setSource: (source: TorrentInfo) => void
}) {
  return (
    <>
      <h1 className='font-medium text-2xl mt-8'>Available Sources</h1>
      <ul className='w-fit mx-auto'>
        {torrents.map((torrent, i) => (
          <li key={i} className='w-full'>
            <Button className='nobg w-full' onClick={() => setSource(torrent)}>
              {torrent.dn}
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}
