import * as cheerio from 'cheerio'
import axios from 'axios'

export interface TorrentData {
  Name: string
  Magnet: string
  Poster: string
  Url: string

  Category: string
  Type: string
  Language: string
  Size: string
  UploadedBy: string
  Downloads: string
  LastChecked: string
  DateUploaded: string
  Seeders: string
  Leechers: string
}

export default async function torrent1337x(query = '', page = 1) {
  const allTorrent: TorrentData[] = []
  let html
  const url = 'https://1337xx.to/search/' + query + '/' + page + '/'
  try {
    html = await axios.get(url)
  } catch {
    return null
  }

  const $ = cheerio.load(html.data)

  const links = $('td.name')
    .map((_, element) => {
      var link = 'https://1337xx.to' + $(element).find('a').next().attr('href')!
      return link
    })
    .get()

  await Promise.all(
    links.map(async (element) => {
      const data: TorrentData = {
        Name: '',
        Magnet: '',
        Poster: '',
        Url: '',
        Category: '',
        Type: '',
        Language: '',
        Size: '',
        UploadedBy: '',
        Downloads: '',
        LastChecked: '',
        DateUploaded: '',
        Seeders: '',
        Leechers: '',
      }
      const labels = [
        'Category',
        'Type',
        'Language',
        'Size',
        'UploadedBy',
        'Downloads',
        'LastChecked',
        'DateUploaded',
        'Seeders',
        'Leechers',
      ] as const
      let html
      try {
        html = await axios.get(element)
      } catch {
        return null
      }
      const $ = cheerio.load(html.data)
      data.Name = $('.box-info-heading h1').text().trim()
      data.Magnet = $('.clearfix ul li a').attr('href') || ''
      const poster = $('div.torrent-image img').attr('src')

      if (typeof poster !== 'undefined') {
        if (poster.startsWith('http')) {
          data.Poster = poster
        } else {
          data.Poster = 'https:' + poster
        }
      } else {
        data.Poster = ''
      }

      $('div .clearfix ul li > span').each((i, element) => {
        data[labels[i]] = $(element).text()
      })
      data.Url = element

      allTorrent.push(data)
    }),
  )

  return allTorrent
}
