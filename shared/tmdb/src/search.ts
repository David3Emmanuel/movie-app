import type { MediaDTO, SearchResults } from './search.types'
import { MediaType } from './index'
import { extendFetch } from './utils/fetch'

// IDEA try streaming

export async function search<T extends MediaDTO>(
  url: string | URL,
): Promise<SearchResults<T>> {
  return extendFetch(url)
    .then((data) => {
      if (data.page) return data as SearchResults<T>
      else throw data
    })
    .then((pageResults) => {
      const filteredResults = pageResults.results.filter((result) => {
        if (!('media_type' in result)) return true
        return Object.values(MediaType).includes(result.media_type as MediaType)
      })
      pageResults.results = filteredResults
      pageResults.total_results = filteredResults.length

      return pageResults
    })
}

export async function fetchAllPages<T extends MediaDTO>(
  url: (page: number) => string | URL,
): Promise<T[]> {
  const firstPageResults = await search<T>(url(1))
  let results = firstPageResults.results

  const numberOfPages = firstPageResults.total_pages
  const pagePromises = []
  for (let page = 2; page <= numberOfPages; page++) {
    pagePromises.push(search<T>(url(page)))
  }

  return Promise.all(pagePromises)
    .then((pageResults) => {
      pageResults.forEach((pageResults) => {
        results = [...results, ...pageResults.results]
      })
    })
    .then(() => results)
}

export function createSearchUrl(
  apiKey: string,
  mediaType: MediaType | 'multi',
  query: string,
  page: number,
  includeAdult: boolean,
) {
  const url = new URL(`https://api.themoviedb.org/3/search/${mediaType}`)
  url.searchParams.append('query', query)
  url.searchParams.append('include_adult', String(includeAdult))
  url.searchParams.append('language', 'en-US')
  url.searchParams.append('page', String(page))
  url.searchParams.append('api_key', apiKey)
  return url
}
