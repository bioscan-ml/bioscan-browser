import { Sort } from '@/types/settings'
import { useEffect, useMemo } from 'react'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'sort'
const SEARCH_PARAM_KEY_DELIMITER = ' '

export const useSort = () => {
  const [sortParams, setSortParams] =
    useSingleSearchParamsState(SEARCH_PARAM_KEY)

  const defaultSort = useMemo(() => {
    const seed = new Date().getTime()

    return {
      key: `random_${seed}`,
    }
  }, [])

  const sort = useMemo(() => {
    if (!sortParams) {
      return defaultSort
    }

    const [key, order] = sortParams.split(SEARCH_PARAM_KEY_DELIMITER)

    return {
      key,
      order,
    } as Sort
  }, [defaultSort, sortParams])

  const setSort = (sort: Sort) => {
    if (sort.order) {
      setSortParams(`${sort.key}${SEARCH_PARAM_KEY_DELIMITER}${sort.order}`)
    } else {
      setSortParams(`${sort.key}`)
    }
  }

  useEffect(() => {
    if (!sortParams) {
      setSort(defaultSort)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortParams])

  return {
    sort,
    setSort,
  }
}
