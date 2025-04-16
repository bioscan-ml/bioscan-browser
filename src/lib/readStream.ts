/* eslint-disable @typescript-eslint/no-explicit-any */

export const readStream = async (url: string): Promise<string> => {
  let result = ''

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(10000) })

    if (!response.body) {
      throw new Error('Response is not a readable stream')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()

    const processStream = async (resultChunk: any) => {
      const { done, value } = resultChunk
      if (done) {
        return
      }

      const chunk = decoder.decode(value, { stream: true })
      result += chunk

      // Read the next chunk recursively
      await reader.read().then(processStream)
    }

    // Start reading the stream
    await reader.read().then(processStream)

    return result
  } catch (error) {
    console.error(error)
    throw error
  }
}
