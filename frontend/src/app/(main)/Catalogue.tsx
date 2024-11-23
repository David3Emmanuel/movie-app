import MediaRow from '@/components/MediaRow'

export default function Catalogue({
  withoutTrending,
}: {
  withoutTrending?: boolean
}) {
  return (
    <>
      {!withoutTrending && (
        <MediaRow
          title='Trending Now'
          mediaItems={`${process.env.BACKEND_URL}/moviedb/trending`}
        />
      )}
      <MediaRow
        title='Discover Movies'
        mediaItems={`${process.env.BACKEND_URL}/moviedb/discover?type=movie`}
      />
      <MediaRow
        title='Discover TV Shows'
        mediaItems={`${process.env.BACKEND_URL}/moviedb/discover?type=tv`}
      />
    </>
  )
}
