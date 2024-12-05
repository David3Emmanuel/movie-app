import * as cheerio from 'cheerio'
import axios from 'axios'

export interface TorrentData {
  Name: string
  Category?: string
  Size: string
  DateUploaded: string
  Seeders: string
  Leechers: string
  Downloads: string
  Torrent: string
  Magnet: string
  Url: string
}

export default async function nyaaSI(query = '', page = 1) {
  let torrents: TorrentData[] = []
  const url = 'https://nyaa.si/?f=0&c=0_0&q=' + query + '&p=' + page
  let html = null
  try {
    html = await axios.get(url)
  } catch {
    return null
  }
  const regex = /.comments/gi
  const nameRegex = /[a-zA-Z\W].+/g

  const $ = cheerio.load(html.data)

  $('tbody tr').each((_, element) => {
    const data: TorrentData = {
      Name: '',
      Category: '',
      Size: '',
      DateUploaded: '',
      Seeders: '',
      Leechers: '',
      Downloads: '',
      Torrent: '',
      Magnet: '',
      Url: '',
    }

    const $find = $(element)
    $find.each((_, element) => {
      const td = $(element).children('td')
      data.Name = $(element)
        .find('td[colspan="2"] a')
        .text()
        .trim()
        .match(nameRegex)![0]
      data.Category = $(element).find('a').attr('title')
      data.Url = (
        'https://nyaa.si' + $(element).find('td[colspan="2"] a').attr('href')
      ).replace(regex, '')

      $find.each((_, element) => {
        data.Size = $(td).eq(3).text()
        data.DateUploaded = $(td).eq(4).text()
        data.Seeders = $(td).eq(5).text()
        data.Leechers = $(td).eq(6).text()
        data.Downloads = $(td).eq(7).text()
        data.Torrent =
          'https://nyaa.si' + $(element).find('.text-center a').attr('href')
        data.Magnet = $(element).find('.text-center a').next().attr('href')!
      })
    })
    torrents.push(data)
  })

  return torrents
}