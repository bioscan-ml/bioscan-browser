import { Separator } from '@/components/ui/separator'
import {
  FIELDS,
  FILTER_TYPES,
  PATHS,
  TAXON_FILTER_TYPES,
} from '@/lib/constants'
import { formatFieldValue } from '@/lib/formatFieldValue'
import { Doc } from '@/types/response-data'
import { Link, To } from 'react-router-dom'

interface FieldsProps {
  doc: Doc
}

export const Fields = ({ doc }: FieldsProps) => (
  <div className="flex items-start gap-4">
    <div className="grid gap-4 flex-1">
      <Field doc={doc} fieldKey="id" />
      <Field doc={doc} fieldKey="sampleid" />
      <Field doc={doc} fieldKey="country" />
      <Field doc={doc} fieldKey="province_state" />
      <Field doc={doc} fieldKey="collectors" />
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
