import { Filter } from '@/types/settings'

const filterToQuery = (filter: Filter) => {
  const query = filter.values.reduce((previousQuery, currentValue) => {
    const currentQuery = `${filter.key}:"${currentValue}"`

    return previousQuery.length
      ? `${previousQuery} OR ${currentQuery}`
      : currentQuery
  }, '')

  return query.length ? `(${query})` : undefined
}

export const filtersToQuery = (filters: Filter[]) => {
  const query = filters.reduce((previousQuery, currentFilter) => {
    const currentQuery = filterToQuery(currentFilter)

    if (!currentQuery) {
      return previousQuery
    }

    return previousQuery.length
      ? `${previousQuery} AND ${currentQuery}`
      : currentQuery
  }, '')

  return query.length ? query : undefined
}
