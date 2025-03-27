import {
  FIELDS,
  FILTER_TYPES,
  PATHS,
  TAXON_FILTER_TYPES,
} from '@/lib/constants'
import { formatFieldValue } from '@/lib/formatFieldValue'
import { cn } from '@/lib/utils'
import { Doc } from '@/types/response-data'
import { SearchIcon } from 'lucide-react'
import { Link, To } from 'react-router-dom'
import { buttonVariants } from '../ui/button'
import { Separator } from '../ui/separator'

interface FieldsProps {
  doc: Doc
  showClosestMatches?: boolean
}

export const Fields = ({ doc, showClosestMatches }: FieldsProps) => (
  <div className="flex items-start gap-4">
    <div className="grid gap-4 flex-1">
      <Field doc={doc} fieldKey="id" />
      <Field doc={doc} fieldKey="sampleid" />
      <Field doc={doc} fieldKey="country" />
      <Field doc={doc} fieldKey="province_state" />
      <Field doc={doc} fieldKey="collectors" />
      {showClosestMatches && <ClosestMatchesField doc={doc} />}
    </div>
    <Separator className="shrink-0" orientation="vertical" />
    <div className="grid gap-4 flex-1">
      <Field doc={doc} fieldKey="phylum" />
      <Field doc={doc} fieldKey="class" />
      <Field doc={doc} fieldKey="order" />
      <Field doc={doc} fieldKey="family" />
      <Field doc={doc} fieldKey="subfamily" />
      <Field doc={doc} fieldKey="genus" />
      <Field doc={doc} fieldKey="species" />
    </div>
  </div>
)

const Field = ({ doc, fieldKey }: { doc: Doc; fieldKey: keyof Doc }) => {
  const field = FIELDS.find((field) => field.key === fieldKey)
  const value = formatFieldValue(doc[fieldKey])

  if (!field || !value) {
    return null
  }

  const link = getFieldLink(field.key, value)

  return (
    <div className="flex flex-col items-start text-sm">
      <span className="font-medium text-muted-foreground">{field.label}</span>
      {link ? (
        <Link to={link} className="text-link">
          {value}
        </Link>
      ) : (
        <span>{value}</span>
      )}
    </div>
  )
}

const ClosestMatchesField = ({ doc }: { doc: Doc }) => (
  <div className="flex flex-col items-start text-sm">
    <span className="font-medium text-muted-foreground mb-2">
      Closest matches
    </span>
    <Link
      className={cn(buttonVariants({ variant: 'outline' }), 'w-min')}
      to={{ pathname: PATHS.FIND_SIMILAR, search: `sampleid=${doc.sampleid}` }}
    >
      Search
      <SearchIcon className="w-4 h-4 ml-2" />
    </Link>
  </div>
)

const getFieldLink = (key: string, value: string): To | undefined => {
  if (TAXON_FILTER_TYPES.some((filterType) => filterType.key === key)) {
    return {
      pathname: PATHS.TAXONOMY_TREE,
      search: `taxon=${key}-${value}`,
    }
  }

  if (FILTER_TYPES.some((filterType) => filterType.key === key))
    return {
      pathname: PATHS.SEARCH,
      search: `filter=${key}:${value}`,
    }
}
