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
import { Field } from '../field'
import { IssueList } from '../issue-list'

interface FieldsProps {
  doc: Doc
}

export const Fields = ({ doc }: FieldsProps) => (
  <div className="flex items-start gap-4 items-stretch">
    <div className="space-y-4 flex-1">
      <DocField doc={doc} fieldKey="id" />
      <DocField doc={doc} fieldKey="sampleid" />
      <DocField doc={doc} fieldKey="country" />
      <DocField doc={doc} fieldKey="province_state" />
      <DocField doc={doc} fieldKey="collectors" />
      <Field label="Reported issues">
        <IssueList id={doc.id} />
      </Field>
    </div>
    <Separator className="h-auto shrink-0" orientation="vertical" />
    <div className="space-y-4 flex-1">
      <DocField doc={doc} fieldKey="phylum" />
      <DocField doc={doc} fieldKey="class" />
      <DocField doc={doc} fieldKey="order" />
      <DocField doc={doc} fieldKey="family" />
      <DocField doc={doc} fieldKey="subfamily" />
      <DocField doc={doc} fieldKey="genus" />
      <DocField doc={doc} fieldKey="species" />
    </div>
  </div>
)

const DocField = ({ doc, fieldKey }: { doc: Doc; fieldKey: keyof Doc }) => {
  const field = FIELDS.find((field) => field.key === fieldKey)
  const value = formatFieldValue(doc[fieldKey])

  if (!field || !value) {
    return null
  }

  const link = getFieldLink(field.key, value)

  return (
    <Field label={field.label} tooltip={field.tooltip}>
      {link ? (
        <Link to={link} className="text-link">
          {value}
        </Link>
      ) : (
        <span>{value}</span>
      )}
    </Field>
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
      search: `${key}=${value}`,
    }
}
