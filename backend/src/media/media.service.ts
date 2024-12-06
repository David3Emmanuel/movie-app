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

    console.log('Searching torrents for:', query)

    const startTime = Date.now()
    const results = await searchTorrents(query, {
      website: website as TorrentWebsite,
    })
    const duration = (Date.now() - startTime) / 1000

    if ('error' in results) throw new Error(results.error)

    console.log(`Found ${results.length} results in ${duration}s`)
    console.log('Processing results...')

    return processResults(results, query, limit)
  }
}
