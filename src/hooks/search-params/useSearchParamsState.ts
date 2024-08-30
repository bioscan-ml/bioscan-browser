import { useSearchParams } from 'react-router-dom'

export const useSearchParamsState = (
  searchParamName: string,
  defaultValue: string[] | null = null,
): readonly [
  searchParamsState: string[] | null,
  setSearchParamsState: (newState: string[] | null) => void,
] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsState = searchParams.getAll(searchParamName)

  const setSearchParamsState = (newState: string[] | null) => {
    searchParams.delete(searchParamName)

    if (newState) {
      newState.forEach((value) => searchParams.append(searchParamName, value))
    }

    searchParams.sort()
    setSearchParams(searchParams)
  }

  return [
    searchParamsState?.length ? searchParamsState : defaultValue,
    setSearchParamsState,
  ]
}

export const useSingleSearchParamsState = (
  searchParamName: string,
  defaultValue: string | null = null,
): readonly [
  searchParamsState: string | null,
  setSearchParamsState: (newState: string | null) => void,
] => {
  const [_searchParamsState, _setSearchParamsState] =
    useSearchParamsState(searchParamName)

  const searchParamsState = _searchParamsState?.length
    ? _searchParamsState[0]
    : defaultValue

  const setSearchParamsState = (newState: string | null) => {
    _setSearchParamsState(newState ? [newState] : null)
  }

  return [searchParamsState, setSearchParamsState]
}
