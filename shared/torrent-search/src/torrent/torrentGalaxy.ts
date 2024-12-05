import * as cheerio from 'cheerio'
import axios from 'axios'

export interface TorrentData {
  Name: string
  Poster: string
  Category: string
  UploadedBy: string
  Size: string
  Seeders: string
  Leechers: string
  DateUploaded: string
  Torrent: string
  Magnet: string
  Url: string
}

export default async function torrentGalaxy(query = '', page = 0) {
  if (page !== 0) {
    try {
      page = page - 1
    } catch {
      //
    }
  }
  const allTorrents: TorrentData[] = []
  const url =
    'https://torrentgalaxy.to/torrents.php?search=' +
    query +
    '&sort=id&order=desc&page=' +
    page
  let html
  try {
    html = await axios.get(url)
  } catch {
    return null
  }

  const $ = cheerio.load(html.data)

  $('div.tgxtablerow.txlight').each((i, element) => {
    const data: TorrentData = {
      Name: '',
      Poster: '',
      Category: '',
      UploadedBy: '',
      Size: '',
      Seeders: '',
      Leechers: '',
      DateUploaded: '',
      Torrent: '',
      Magnet: '',
      Url: '',
    }
    const posterRegex = /\bhttps?:[^)''"]+\.(?:jpg|jpeg|gif|png)(?![a-z])/g
    data.Name = $(element).find(':nth-child(4) div a b').text()
    data.Poster = $(element).attr('onmouseover')?.match(posterRegex)![0] || ''
    data.Category = $(element).find(':nth-child(1) a small').text()
    data.Url =
      'https://torrentgalaxy.to' + $(element).find('a.txlight').attr('href')
    data.UploadedBy = $(element).find(':nth-child(7) span a span').text()
    data.Size = $(element).find(':nth-child(8)').text()
    data.Seeders = $(element)
      .find(':nth-child(11) span font:nth-child(1)')
      .text()
    data.Leechers = $(element)
      .find(':nth-child(11) span font:nth-child(2)')
      .text()
    data.DateUploaded = $(element).find(':nth-child(12)').text()
    data.Torrent = $(element)
      .find('.tgxtablecell.collapsehide.rounded.txlight a')
      .attr('href')!
    data.Magnet = $(element)
      .find('.tgxtablecell.collapsehide.rounded.txlight a')
      .next()
      .attr('href')!
    allTorrents.push(data)
  })
  return allTorrents
}
