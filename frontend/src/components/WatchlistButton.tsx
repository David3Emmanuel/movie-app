'use client'

import { useState, useEffect } from 'react'
import {
  isInWatchlist,
  addToWatchlist,
  removeFromWatchlist,
} from '../utils/watchlist'
import { MediaItem } from '@project/backend/dist/schemas/user.schema'
import Button from '@/components/Button'

export default function WatchlistButton({
  mediaItem,
}: {
  mediaItem: MediaItem
}) {
  const [inWatchlist, setInWatchlist] = useState(false)

  useEffect(() => {
    const checkWatchlist = async () => {
      const result = await isInWatchlist(mediaItem)
      setInWatchlist(result)
    }
    checkWatchlist()
  }, [mediaItem])

  const toggleWatchlist = async () => {
    if (inWatchlist) {
      await removeFromWatchlist(mediaItem)
    } else {
      await addToWatchlist(mediaItem)
    }
    setInWatchlist(!inWatchlist)
  }

  return (
    <Button
      onClick={toggleWatchlist}
      className='bg-transparent hover:bg-transparent p-0 xs:p-2 gap-2 xs:nobg xs:hover:!bg-primary/75'
    >
      <p className='hidden xs:block'>
        {inWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
      </p>
      <span className='material-symbols-outlined max-xs:text-5xl max-xs:logo-lg max-xs:hover:text-neutral-300 max-xs:active:text-neutral-400 max-xs:hover:scale-105'>
        {inWatchlist ? 'remove_circle' : 'add_circle'}
      </span>
    </Button>
  )
}
