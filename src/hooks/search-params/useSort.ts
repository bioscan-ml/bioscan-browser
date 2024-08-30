import { Sort } from '@/types/settings'
import { useMemo } from 'react'
import { useSingleSearchParamsState } from './useSearchParamsState'

const SEARCH_PARAM_KEY = 'sort'
const SEARCH_PARAM_KEY_DELIMITER = ' '

export const useSort = (defaultSort: Sort) => {
  const [sortParams, setSortParams] = useSingleSearchParamsState(
    SEARCH_PARAM_KEY,
    `${defaultSort.key}${SEARCH_PARAM_KEY_DELIMITER}${defaultSort.order}`,
  )

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

  return {
    sort,
    setSort: (sort: Sort) => {
      setSortParams(`${sort.key}${SEARCH_PARAM_KEY_DELIMITER}${sort.order}`)
    },
  }
}
