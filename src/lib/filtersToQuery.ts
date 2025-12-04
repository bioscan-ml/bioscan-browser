import { Filter } from '@/types/settings'
import { FILTER_TYPES } from './constants'

const filterToQuery = (filter: Filter) => {
  const query = filter.values.reduce((previousQuery, currentValue) => {
    const type = FILTER_TYPES.find(
      (filterType) => filterType.key === filter.key,
    )?.type

    let currentQuery: string
    if (type === 'interval') {
      currentQuery = `${filter.key}:[${currentValue.split('-').join(' TO ')}]`
    } else {
      currentQuery = `${filter.key}:"${currentValue}"`
    }

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
