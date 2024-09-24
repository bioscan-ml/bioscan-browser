import { useEmbeddings } from '@/hooks/useEmbeddings'
import { FIELDS, FILTER_TYPES, TAXON_FILTER_TYPES } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Link, To } from 'react-router-dom'

interface FieldsProps {
  doc: Doc
  showEmbeddings?: boolean
}

export const Fields = ({ doc, showEmbeddings = true }: FieldsProps) => (
  <div className="grid gap-4 grid-cols-2">
    {FIELDS.map((field) => {
      const fieldValue = doc[field.key]

      if (!fieldValue) {
        return null
      }

      const fieldLink = getFieldLink(field.key, fieldValue)

      return (
        <div key={field.key} className="flex flex-col items-start text-sm">
          <span className="font-medium text-muted-foreground">
            {field.label}
          </span>
          {fieldLink ? (
            <Link to={fieldLink} className="text-link">
              {fieldValue}
            </Link>
          ) : (
            <span>{fieldValue}</span>
          )}
        </div>
      )
    })}
    {showEmbeddings && (
      <div className="flex flex-col items-start text-sm">
        <span className="font-medium text-muted-foreground">Embeddings</span>
        <EmbeddingsValue doc={doc} />
      </div>
    )}
  </div>
)

const EmbeddingsValue = ({ doc }: { doc: Doc }) => {
  const { data, isPending } = useEmbeddings(doc.id)

  if (isPending) {
    return <span>Loading...</span>
  }

  if (!data?.numFound) {
    return <span>n/a</span>
  }

  return (
    <Link
      to={{ pathname: '/search-similar', search: `id=${doc.id}` }}
      className="text-link"
    >
      {data.numFound} {data.numFound === 1 ? 'record' : 'records'}
    </Link>
  )
}

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
