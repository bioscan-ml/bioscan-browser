import { useSearchParams } from 'react-router-dom'

export function useSearchParamsState(
  searchParamName: string,
  defaultValue: string | null,
): readonly [
  searchParamsState: string | null,
  setSearchParamsState: (newState: string | null) => void,
] {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchParamsState = searchParams.get(searchParamName) ?? defaultValue

  const setSearchParamsState = (newState: string | null) => {
    searchParams.delete(searchParamName)

    if (newState) {
      searchParams.set(searchParamName, newState)
    }

    searchParams.sort()
    setSearchParams(searchParams)
  }

  return [searchParamsState, setSearchParamsState]
}
