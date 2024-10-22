export const getPaginationLabel = <T>(data: {
  start: number
  numFound: number
  docs: T[]
}) => {
  const fromLabel = (data.start + 1).toLocaleString()
  const toLabel = (data.start + data.docs.length).toLocaleString()
  const totalLabel = data.numFound.toLocaleString()

  return `Showing ${fromLabel}-${toLabel} of ${totalLabel} ${data.numFound === 1 ? 'record' : 'records'}`
}
