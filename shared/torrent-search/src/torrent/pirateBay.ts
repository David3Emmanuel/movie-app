import * as cheerio from 'cheerio'
import axios from 'axios'

export interface TorrentData {
  Name: string
  Size: string
  DateUploaded: string
  Category: string
  Seeders: string
  Leechers: string
  UploadedBy: string
  Url: string
  Magnet: string
}

export default async function pirateBay(query = '', page = 1) {
  const allTorrents: TorrentData[] = []
  const url = 'https://thehiddenbay.com/search/' + query + '/' + page + '/99/0'
  let html
  try {
    html = await axios.get(url)
  } catch {
    return null
  }
  const $ = cheerio.load(html.data)

  $('table#searchResult tr').each((_, element) => {
    const data = $(element)
      .find('font.detDesc')
      .text()
      .replace(/(Size|Uploaded)/gi, '')
      .replace(/ULed/gi, 'Uploaded')
      .split(',')
      .map((value) => value.trim())
    const date = data[0]
    const size = data[1]
    const uploader = $(element).find('font.detDesc a').text()

    const torrent: TorrentData = {
      Name: $(element).find('a.detLink').text(),
      Size: size,
      DateUploaded: date,
      Category: $(element).find('td.vertTh center a').eq(0).text(),
      Seeders: $(element).find('td').eq(2).text(),
      Leechers: $(element).find('td').eq(3).text(),
      UploadedBy: uploader,
      Url: $(element).find('a.detLink').attr('href')!,
      Magnet: $(element).find('td div.detName').next().attr('href')!,
    }

    if (torrent.Name.length) {
      allTorrents.push(torrent)
    }
  })

  return allTorrents
}
