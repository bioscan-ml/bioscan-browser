/* eslint-disable @typescript-eslint/no-explicit-any */

import { readStream } from './readStream'

const API_URL = '/gradio'

export const makeGradioPrediction = async ({
  data = [],
  method,
}: {
  data?: any[]
  method: 'getRandID' | 'searchEmbeddings'
}): Promise<string> => {
  // Get event id
  const eventIdRes = await fetch(`${API_URL}/call/${method}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      data,
    }),
  })
  const eventIdData = await eventIdRes.json()
  const eventId = eventIdData.event_id

  if (!eventId) {
    throw Error()
  }

  // Use event id to make prediction
  return await readStream(`${API_URL}/call/${method}/${eventId}`)
}
