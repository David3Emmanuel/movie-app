export default async function HomePage() {
  let messageFromBackend: string

  if (process.env.BACKEND_URL === undefined) {
    messageFromBackend = 'BACKEND_URL is not defined'
  } else {
    try {
      const response = await fetch(process.env.BACKEND_URL)
      messageFromBackend = await response.text()
    } catch (error) {
      console.error(error)
      messageFromBackend = (error as Error).message
    }
  }

  return (
    <>
      <p>Frontend Home Page</p>
      <p>Backend URL - [{process.env.BACKEND_URL}]</p>
      <p>Backend Message - {messageFromBackend}</p>
    </>
  )
}
