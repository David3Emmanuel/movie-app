import { MediaItem } from 'src/schemas/user.schema'

export interface WatchlistResponseDTO {
  success: boolean
  message: string
  media_item?: MediaItem
}
