'use client'

import Button from '@/components/Button'
import { TorrentInfo } from '@project/backend/src/media/processResults'
import { useState } from 'react'

export default function Player({ torrents }: { torrents: TorrentInfo[] }) {
  const [source, setSource] = useState<TorrentInfo | null>(null)

  return (
    <div className='pt-16 flex flex-col items-center justify-center'>
      {source ? (
        <video controls className='max-w-full'>
          <source src={source.link} type='video/mp4' />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Sources torrents={torrents} setSource={setSource} />
      )}
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
      <ul>
        {torrents.map((torrent, i) => (
          <li key={i}>
            <Button className='nobg' onClick={() => setSource(torrent)}>
              {torrent.dn}
            </Button>
          </li>
        ))}
      </ul>
    </>
  )
}
