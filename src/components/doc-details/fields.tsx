import { FIELDS, FILTER_TYPES, TAXON_FILTER_TYPES } from '@/lib/constants'
import { formatFieldValue } from '@/lib/formatFieldValue'
import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import { SearchIcon } from 'lucide-react'
import { Link, To } from 'react-router-dom'
import { buttonVariants } from '../ui/button'

interface FieldsProps {
  doc: Doc
  showClosestMatches?: boolean
}

export const Fields = ({ doc, showClosestMatches = true }: FieldsProps) => (
  <div className="grid gap-4 grid-cols-2">
    {FIELDS.map((field) => {
      const fieldValue = formatFieldValue(doc[field.key])

      if (!fieldValue) {
        return null
      }

      return (
        <Field
          key={field.key}
          label={field.label}
          link={getFieldLink(field.key, fieldValue)}
          value={fieldValue}
        />
      )
    })}
    {showClosestMatches && <ClosestMatchesField doc={doc} />}
  </div>
)

const Field = ({
  label,
  link,
  value,
}: {
  label: string
  link?: To
  value: string | string[]
}) => (
  <div className="flex flex-col items-start text-sm">
    <span className="font-medium text-muted-foreground">{label}</span>
    {link ? (
      <Link to={link} className="text-link">
        {value}
      </Link>
    ) : (
      <span>{value}</span>
    )}
  </div>
)

const ClosestMatchesField = ({ doc }: { doc: Doc }) => (
  <div className="flex flex-col items-start text-sm">
    <span className="font-medium text-muted-foreground mb-2">
      Closest matches
    </span>
    <Link
      className={cn(buttonVariants({ variant: 'outline' }), 'w-min')}
      to={{ pathname: '/search-similar', search: `queryid=${doc.id}` }}
    >
      Search
      <SearchIcon className="w-4 h-4 ml-2" />
    </Link>
  </div>
)

const getFieldLink = (key: string, value: string): To | undefined => {
  if (TAXON_FILTER_TYPES.some((filterType) => filterType.key === key)) {
    return {
      pathname: '/taxonomy-viewer',
      search: `taxon=${key}-${value}`,
    }
  }

  if (FILTER_TYPES.some((filterType) => filterType.key === key))
    return {
      pathname: '/asset-querier',
      search: `filter=${key}:${value}`,
    }
}
