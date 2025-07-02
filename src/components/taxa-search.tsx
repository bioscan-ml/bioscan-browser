import { useDebounce } from '@/hooks/useDebounce'
import { useTaxaSearch } from '@/hooks/useTaxaSearch'
import { Taxon } from '@/types/response-data'
import { useState } from 'react'

import { Badge } from './ui/badge'
import { Input } from './input'

export const TaxaSearch = ({
  onTaxonSelect,
}: {
  onTaxonSelect: (taxon: Taxon) => void
}) => {
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString = useDebounce(searchString, 200)
  const { data, isPending, error } = useTaxaSearch(debouncedSearchString)

  const message = (() => {
    if (!debouncedSearchString.length || isPending) {
      return
    }

    return error?.message?.length
      ? error.message
      : `The search string "${debouncedSearchString}" did not match any records.`
  })()

  return (
    <div className="w-full relative lg:w-64">
      <Input
        isLoading={isPending}
        placeholder="Search taxa..."
        setValue={setSearchString}
        value={searchString}
        variant="search"
      />
      {message || data?.length ? (
        <div className="absolute bottom-[-0.5rem] right-0 translate-y-full w-full rounded-md border bg-popover text-popover-foreground shadow-md z-50 sm:w-96">
          {data?.length ? (
            data.map((taxon) => (
              <SearchResult
                key={taxon.id}
                onClick={() => {
                  onTaxonSelect(taxon)
                  setSearchString('')
                }}
                taxon={taxon}
              />
            ))
          ) : (
            <div className="flex flex-col p-4">
              <span className="text-base font-medium">No results found</span>
              <span className="text-sm text-muted-foreground">{message}</span>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

const SearchResult = ({
  onClick,
  taxon,
}: {
  onClick?: () => void
  taxon: Taxon & { count: number }
}) => {
  const matchedTerm =
    taxon.matched_term.charAt(0).toUpperCase() + taxon.matched_term.slice(1)

  return (
    <div
      className="flex items-start gap-4 border-b p-4 cursor-pointer last:border-b-0 hover:bg-muted"
      onClick={onClick}
    >
      <img
        alt=""
        src={taxon.default_photo?.square_url}
        className="w-16 h-16 rounded-sm"
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <span className="text-base font-medium">{taxon.name}</span>
          <Badge variant="outline" className="uppercase">
            {taxon.rank}
          </Badge>
        </div>
        <span className="text-sm">
          {taxon.preferred_common_name &&
          taxon.preferred_common_name !== matchedTerm
            ? `${taxon.preferred_common_name} (${matchedTerm})`
            : matchedTerm}
        </span>
        <span className="text-sm text-muted-foreground">
          {taxon.count.toLocaleString()}{' '}
          {taxon.count === 1 ? 'record' : 'records'}
        </span>
      </div>
    </div>
  )
}
