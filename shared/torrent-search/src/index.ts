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

const validWebsites = [
  '1337x',
  'nyaasi',
  'yts',
  'eztv',
  'torlock',
  'piratebay',
  'tgx',
  'rarbg',
  'zooqle',
  'kickass',
  'bitsearch',
  'glodls',
  'magnetdl',
  'limetorrent',
  'torrentfunk',
  'torrentproject',
  'ettv',
  'all',
] as const

async function fetchData(
  query: string,
  fetchFunction: Function,
  page?: number,
  maxPage?: number,
): Promise<TorrentData | { error: string }> {
  if (maxPage && page && page > maxPage) {
    return {
      error: `Please enter page value less than ${
        maxPage + 1
      } to get the result :)`,
    }
  }
  const data = await fetchFunction(query, page)
  if (data === null) {
    return { error: 'Website is blocked change IP' }
  } else if (data.length === 0) {
    return { error: `No search result available for query (${query})` }
  } else {
    return data
  }
}

export default async function searchTorrents(
  query: string,
  {
    website,
    page,
  }: {
    website?: (typeof validWebsites)[number]
    page?: number
  },
): Promise<TorrentData | { error: string }> {
  website = website || 'all'
  if (!validWebsites.includes(website)) {
    return {
      error:
        'please select ' +
        validWebsites.join(' | ') +
        ' (to scrap from every site)',
    }
  }

  switch (website) {
    case '1337x':
      return fetchData(query, torrent1337x, page, 50)
    case 'yts':
      return fetchData(query, yts, page)
    case 'eztv':
      return fetchData(query, ezTV)
    case 'torlock':
      return fetchData(query, torLock, page)
    case 'piratebay':
      return fetchData(query, pirateBay, page)
    case 'tgx':
      return fetchData(query, torrentGalaxy, page)
    case 'rarbg':
      return fetchData(query, rarbg, page)
    case 'zooqle':
      return fetchData(query, zooqle, page)
    case 'kickass':
      return fetchData(query, kickAss, page)
    case 'bitsearch':
      return fetchData(query, bitSearch, page)
    case 'glodls':
      return fetchData(query, glodls, page)
    case 'magnetdl':
      return fetchData(query, magnet_dl, page)
    case 'limetorrent':
      return fetchData(query, limeTorrent, page)
    case 'torrentfunk':
      return fetchData(query, torrentFunk, page)
    case 'torrentproject':
      return fetchData(query, torrentProject, page)
    case 'nyaasi':
      return fetchData(query, nyaaSI, page, 14)
    case 'ettv':
      return fetchData(query, ettvCentral, page)
    case 'all':
      const data = await combo(query, page)
      if (data !== null && data.length > 0) {
        return data
      } else {
        return { error: `No search result available for query (${query})` }
      }
    default:
      return {
        error: `please select ${validWebsites.join(
          ' | ',
        )} (to scrap from every site)`,
      }
  }
}
