import MediaRow from '@/components/MediaRow'
import { fetchWithAuth } from '@/utils/fetchWithAuth'
import { ImageType } from '@project/backend/dist/moviedb/moviedb.dto'
import { PublicUser } from '@project/backend/dist/schemas/user.schema'

export default async function ProfilePage() {
  const data = (await fetchWithAuth(`${process.env.BACKEND_URL}/users/me`)) as
    | PublicUser
    | {
        success: boolean
        message: string
      }
  if ('success' in data) return <div>{data.message}</div>
  const profile = data
  return (
    <div className='p-2 mt-16'>
      <h1 className='text-2xl xs:text-3xl sm:text-4xl leading-tight font-semibold'>
        My Profile
      </h1>
      <MediaRow
        title='Watchlist'
        mediaItems={profile.watchlist}
        imageType={ImageType.Poster}
      />
    </div>
  )
}
