import { MediaType } from '.'
import type {
  Image,
  ImageConfig,
  ImageErrorDTO,
  MediaImageDTO,
  MediaImageWithSrcDTO,
} from './image.types'
import { extendFetch } from './utils/fetch'

export function getImageConfig(apiKey: string) {
  return extendFetch<{ image: ImageConfig }>(
    `https://api.themoviedb.org/3/configuration?api_key=${apiKey}`,
    {},
    'unlimited',
  ).then(({ image: imageConfig }) => imageConfig)
}

export async function getImage(apiKey: string, id: number, type: MediaType) {
  const url = new URL(`https://api.themoviedb.org/3/${type}/${id}/images`)
  url.searchParams.append('api_key', apiKey)
  const imageDetails = await extendFetch<MediaImageDTO | ImageErrorDTO>(url)

  if ('success' in imageDetails) {
    return imageDetails
  }

  const addSrc = (images: Image[]) =>
    images.map((image) => ({
      ...image,
      src: getImageSrc(image.file_path),
    }))

  return {
    ...imageDetails,
    backdrops: addSrc(imageDetails.backdrops),
    logos: addSrc(imageDetails.logos),
    posters: addSrc(imageDetails.posters),
  } as MediaImageWithSrcDTO
}

function getImageSrc(filePath: string) {
  return `https://image.tmdb.org/t/p/original${filePath}`
}
