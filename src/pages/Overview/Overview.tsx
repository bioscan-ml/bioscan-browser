import { useData } from '../../data/useData'

export const Overview = () => {
  const { isPending, error, data } = useData()

  if (isPending) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>{'An error has occurred: ' + error.message}</p>
  }

  return <div>{data?.docs.map((row) => <div>{row.id}</div>)}</div>
}
