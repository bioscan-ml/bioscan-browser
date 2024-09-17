import { useDebounce } from '@/hooks/useDebounce'
import { useTaxaSearch } from '@/hooks/useTaxaSearch'
import { Taxon } from '@/types/response-data'
import { SearchIcon, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Loader } from './loader'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const TaxaSearch = () => {
  const [searchString, setSearchString] = useState('')
  const debouncedSearchString = useDebounce(searchString, 200)
  const { data, isPending } = useTaxaSearch(debouncedSearchString)

  return (
    <div className="w-64 relative hidden lg:block">
      <SearchInput
        placeholder="Search taxa..."
        isLoading={isPending}
        searchString={searchString}
        setSearchString={setSearchString}
      />
      {data?.length ? (
        <div className="absolute bottom-[-0.5rem] right-0 translate-y-full w-96 rounded-md border bg-popover text-popover-foreground shadow-md">
          {data.map((taxon) => (
            <SearchResult
              key={taxon.id}
              taxon={taxon}
              onClick={() => setSearchString('')}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

const SearchInput = ({
  placeholder,
  isLoading,
  searchString,
  setSearchString,
}: {
  isLoading?: boolean
  placeholder?: string
  searchString: string
  setSearchString: (searchString: string) => void
}) => (
  <div className="relative">
    <div className="w-10 h-10 absolute top-0 left-0 flex items-center justify-center">
      <SearchIcon className="w-4 h-4 text-muted-foreground" />
    </div>
    <Input
      className="px-10"
      placeholder={placeholder}
      value={searchString}
      onChange={(e) => setSearchString(e.currentTarget.value)}
    />
    <div className="absolute top-0 right-0 flex items-center justify-center">
      {isLoading ? (
        <Loader className="w-10 h-10 p-2" />
      ) : searchString.length ? (
        <Button
          aria-label="Clear"
          size="icon"
          variant="ghost"
          onClick={() => setSearchString('')}
        >
          <X className="w-4 h-4" />
        </Button>
      ) : null}
    </div>
  </div>
)

const SearchResult = ({
  taxon,
  onClick,
}: {
  taxon: Taxon
  onClick?: () => void
}) => {
  const matchedTerm =
    taxon.matched_term.charAt(0).toUpperCase() + taxon.matched_term.slice(1)

  return (
    <Link
      to={{
        pathname: '/taxonomy-viewer',
        search: `taxon=${taxon.rank}-${taxon.name}`,
      }}
      onClick={onClick}
      className="flex items-start gap-4 border-b p-4 last:border-b-0 hover:bg-muted/50"
    >
      <img
        alt=""
        src={taxon.default_photo?.square_url}
        className="w-12 h-12 rounded-sm"
      />
      <div className="flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4">
          <span className="text-sm font-medium">{taxon.name}</span>
          <Badge variant="outline" className="uppercase">
            {taxon.rank}
          </Badge>
        </div>
        <span className="text-sm text-muted-foreground">
          {taxon.preferred_common_name &&
          taxon.preferred_common_name !== matchedTerm
            ? `${taxon.preferred_common_name} (${matchedTerm})`
            : matchedTerm}
        </span>
      </div>
    </Link>
  )
}
