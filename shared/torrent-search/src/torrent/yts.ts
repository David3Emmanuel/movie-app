import * as cheerio from 'cheerio'
import axios from 'axios'

export interface TorrentData {
  Name: string
  ReleasedDate: string
  Genre: string
  Rating: string
  Likes: string
  Runtime: string
  Language: string
  Url: string
  Poster?: string
  Files: TorrentFile[]
  Torrent: string
}

export interface TorrentFile {
  Quality: string
  Type: string
  Size: string
  Torrent: string
  Magnet: string
}

export default async function yts(query = '', page = 1) {
  let all: TorrentData[] = []
  let ALLURL: string[] = []
  if (page === 1) {
    var url =
      'https://yts.mx/browse-movies/' + query + '/all/all/0/latest/0/all'
  } else {
    var url =
      'https://yts.mx/browse-movies/' +
      query +
      '/all/all/0/latest/0/all?page=' +
      page
  }
  let html
  try {
    html = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36',
      },
    })
  } catch {
    return null
  }

  const $ = cheerio.load(html.data)
  $('div.browse-movie-bottom').each((_, element) => {
    let url = $(element).find('a').attr('href')!
    ALLURL.push(url)
  })

  await Promise.all(
    ALLURL.map(async (url) => {
      const data: TorrentData = {
        Name: '',
        ReleasedDate: '',
        Genre: '',
        Rating: '',
        Likes: '',
        Runtime: '',
        Language: '',
        Url: '',
        Poster: '',
        Files: [],
        Torrent: '',
      }
      let html
      try {
        html = await axios.get(url)
      } catch {
        return
      }

      const $ = cheerio.load(html.data)

      data['Name'] = $('div.hidden-xs').find('h1').text()
      data['ReleasedDate'] = $('div.hidden-xs').find('h2').eq(0).text()
      data['Genre'] = $('div.hidden-xs').find('h2').eq(1).text()
      data['Rating'] =
        (
          $('div.bottom-info div.rating-row').eq(3).find('span').eq(0).text() +
          ' ⭐'
        ).trim() || 'Not Rated'
      data['Likes'] = $('div.bottom-info div.rating-row')
        .eq(0)
        .find('span')
        .eq(1)
        .text()
      data['Runtime'] = $('div .tech-spec-info')
        .find('div .row')
        .eq(1)
        .find('div .tech-spec-element')
        .eq(2)
        .text()
        .trim()
      data['Language'] = $('div .tech-spec-info')
        .find('div .row')
        .eq(0)
        .find('div .tech-spec-element')
        .eq(2)
        .text()
        .trim()
      data['Url'] = url
      data['Poster'] = $('div #movie-poster').eq(0).find('img').attr('src')

      $('.modal-download > div:nth-child(1) div.modal-content').each(
        (i, el) => {
          $('div.modal-torrent').each((_, ele) => {
            let files: TorrentFile = {
              Quality: $(ele).find(':nth-child(1) >span').text(),
              Type: $(ele).find(':nth-child(2)').text(),
              Size: $(ele).find(':nth-child(5)').text(),
              Torrent: $(ele).find(':nth-child(6)').attr('href')!,
              Magnet: $(ele).find(':nth-child(7)').attr('href')!,
            }

            data.Files.push(files)
          })
        },
      )
      all.push(data)
    }),
  )

  return all
}
