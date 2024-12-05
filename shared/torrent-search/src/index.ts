import nyaaSI from './torrent/nyaaSI'
import torrentGalaxy from './torrent/torrentGalaxy'
import combo, { TorrentData } from './torrent/COMBO'
import rarbg from './torrent/rarbg'
import ettvCentral from './torrent/ettv'
import zooqle from './torrent/zooqle'
import kickAss from './torrent/kickAss'
import bitSearch from './torrent/bitSearch'
import glodls from './torrent/gloTorrents'
import magnet_dl from './torrent/magnet_dl'
import limeTorrent from './torrent/limeTorrent'
import torrentFunk from './torrent/torrentFunk'
import torrentProject from './torrent/torrentProject'
import torrent1337x from './torrent/1337x'
import yts from './torrent/yts'
import ezTV from './torrent/ezTV'
import torLock from './torrent/torLock'
import pirateBay from './torrent/pirateBay'

export default async function searchTorrents(
  query: string,
  {
    website,
    page,
  }: {
    website?: string
    page?: number
  },
): Promise<TorrentData | { error: string }> {
  website = website?.toLowerCase() || 'all'

  if (website === '1337x') {
    if (page && page > 50) {
      return {
        error: 'Please enter page value less than 51 to get the result :)',
      }
    } else {
      const data = await torrent1337x(query, page)
      if (data === null) {
        return { error: 'Website is blocked change IP' }
      } else if (data.length === 0) {
        return { error: `No search result available for query (${query})` }
      } else {
        return data
      }
    }
  }
  if (website === 'yts') {
    const data = await yts(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'eztv') {
    const data = await ezTV(query)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'torlock') {
    const data = await torLock(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'piratebay') {
    const data = await pirateBay(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'tgx') {
    const data = await torrentGalaxy(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'rarbg') {
    const data = await rarbg(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'zooqle') {
    const data = await zooqle(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'kickass') {
    const data = await kickAss(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'bitsearch') {
    const data = await bitSearch(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'glodls') {
    const data = await glodls(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'magnetdl') {
    const data = await magnet_dl(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'limetorrent') {
    const data = await limeTorrent(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'torrentfunk') {
    const data = await torrentFunk(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'torrentproject') {
    const data = await torrentProject(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'nyaasi') {
    if (page && page > 14) {
      return { error: '14 is the last page' }
    } else {
      const data = await nyaaSI(query, page)
      if (data === null) {
        return { error: 'Website is blocked change IP' }
      } else if (data.length === 0) {
        return { error: `No search result available for query (${query})` }
      } else {
        return data
      }
    }
  }
  if (website === 'ettv') {
    const data = await ettvCentral(query, page)
    if (data === null) {
      return { error: 'Website is blocked change IP' }
    } else if (data.length === 0) {
      return { error: `No search result available for query (${query})` }
    } else {
      return data
    }
  }
  if (website === 'all') {
    const data = await combo(query, page)
    if (data !== null && data.length > 0) {
      return data
    } else {
      return { error: `No search result available for query (${query})` }
    }
  }
  return {
    error:
      'please select 1337x | nyaasi | yts | Piratebay | torlock | eztv | TorrentGalaxy(tgx) | rarbg | zooqle | kickass | bitsearch | glodls | magnetdl | limetorrent | torrentfunk | torrentproject | all (to scrap from every site)',
  }
}
