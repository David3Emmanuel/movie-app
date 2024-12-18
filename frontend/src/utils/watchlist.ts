'use server'

import { MediaItem } from '@project/backend/dist/schemas/user.schema'
import { fetchWithAuth } from './fetchWithAuth'

export async function getWatchlist() {
  const data = await fetchWithAuth(`${process.env.BACKEND_URL}/users/watchlist`)
  return data as MediaItem[]
}

export async function isInWatchlist(mediaItem: MediaItem) {
  const watchlist = await getWatchlist()
  return watchlist.some(
    (item) => item.id === mediaItem.id && item.type === mediaItem.type,
  )
}

export async function addToWatchlist(mediaItem: MediaItem) {
  return await fetchWithAuth(`${process.env.BACKEND_URL}/users/watchlist`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mediaItem),
  })
}

export async function removeFromWatchlist(mediaItem: MediaItem) {
  return await fetchWithAuth(
    `${process.env.BACKEND_URL}/users/watchlist/${mediaItem.id}?type=${mediaItem.type}`,
    {
      method: 'DELETE',
    },
  )
}
