import { useEmbeddings } from '@/hooks/useEmbeddings'
import { FIELDS, FILTER_TYPES, TAXON_FILTER_TYPES } from '@/lib/constants'
import { formatFieldValue } from '@/lib/formatFieldValue'
import { Doc } from '@/types/response-data'
import { Link, To } from 'react-router-dom'

interface FieldsProps {
  doc: Doc
  showEmbeddings?: boolean
}

export const Fields = ({ doc, showEmbeddings = true }: FieldsProps) => (
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
    {showEmbeddings && <EmbeddingsField doc={doc} />}
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

const EmbeddingsField = ({ doc }: { doc: Doc }) => {
  const label = 'Closest matches'
  const { data, isPending } = useEmbeddings(doc.id)

  if (isPending) {
    return <Field label={label} value="Loading..." />
  }

  if (!data?.numFound) {
    return <Field label={label} value="n/a" />
  }

  return (
    <Field
      label={label}
      link={{ pathname: '/search-similar', search: `id=${doc.id}` }}
      value={`${data.numFound} ${data.numFound === 1 ? 'record' : 'records'}`}
    />
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
