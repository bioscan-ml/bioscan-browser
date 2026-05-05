import { Separator } from '@/components/ui/separator'
import {
  FIELDS,
  FILTER_TYPES,
  PATHS,
  TAXON_FILTER_TYPES,
} from '@/lib/constants'
import { formatFieldValue } from '@/lib/formatFieldValue'
import { Doc } from '@/types/response-data'
import { ExternalLinkIcon } from 'lucide-react'
import { Link, To } from 'react-router-dom'
import { Field } from '../field'
import { FindSimilarControl } from '../find-similar-control'
import { IssueList } from '../issue-list'
import { buttonVariants } from '../ui/button'

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
      <DocField doc={doc} fieldKey="organism_area_mm2" />
      <Field label="Reported issues">
        <IssueList id={doc.id} />
      </Field>
      <Field label="Resources">
        <div className="flex items-center gap-4">
          <FindSimilarControl doc={doc} variant="outline" />
          <a
            href={`https://portal.boldsystems.org/record/${doc.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: 'outline',
            })}
          >
            BOLD
            <ExternalLinkIcon className="h-4 w-4 ml-3" />
          </a>
        </div>
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

  if (
    FILTER_TYPES.some(
      (filterType) =>
        filterType.key === key && filterType.key !== 'organism_area_mm2',
    )
  )
    return {
      pathname: PATHS.SEARCH,
      search: `${key}=${value}`,
    }
}
