import { Injectable } from '@nestjs/common'
import searchTorrents, {
  TorrentWebsite,
  validWebsites,
} from '@project/torrent-search'
import processResults from './processResults'

@Injectable()
export class MediaService {
  async findTorrents(query: string, website?: string, limit?: number) {
    if (website && !validWebsites.includes(website as TorrentWebsite)) {
      throw new Error(`Invalid website: ${website}`)
    }

    const results = await searchTorrents(query, {
      website: website as TorrentWebsite,
    })
    if ('error' in results) throw new Error(results.error)

    return processResults(results, query, limit)
  }
}
