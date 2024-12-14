'use client'

import Button from '@/components/Button'
import formatTitle from '@/utils/formatTitle'
import { MediaItem } from '@project/backend/dist/schemas/user.schema'
import { useState } from 'react'

export default function ShareButton({
  title,
  mediaItem,
}: {
  title: string
  mediaItem: MediaItem
}) {
  const navigatorShare = navigator.share
  const [canShare, setCanShare] = useState(
    Boolean(window.isSecureContext && navigator.share),
  )

  if (!navigatorShare) return null

  async function shareMedia() {
    const shareDetails: ShareData = {
      title,
      url: `${window.location.host}/details/${mediaItem.type}-${
        mediaItem.id
      }/${formatTitle(title)}`,
      text: `Watch ${title} on PLAYCINE`,
    }
    console.log('Sharing', shareDetails)
    try {
      await navigatorShare(shareDetails)
    } catch (e) {
      console.error(e)
      setCanShare(false)
    }
  }

  return canShare ? (
    <Button
      onClick={shareMedia}
      className='bg-transparent hover:bg-transparent p-0 xs:p-2 gap-2 xs:nobg xs:hover:!bg-primary/75'
    >
      <p className='hidden xs:block'>Share</p>
      <span className='material-symbols-outlined max-xs:scale-75 max-xs:text-5xl max-xs:logo-lg max-xs:hover:text-neutral-300 max-xs:active:text-neutral-400 max-xs:hover:scale-105'>
        share
      </span>
    </Button>
  ) : null
}
