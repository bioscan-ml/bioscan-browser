export const handleINatResponse = (res: Response) => {
  if (!res.ok) {
    if (res.status === 429) {
      throw Error('iNaturalist API rate limit has been exceeded.')
    } else {
      throw Error('The request to iNaturalist API failed.')
    }
  }
}
