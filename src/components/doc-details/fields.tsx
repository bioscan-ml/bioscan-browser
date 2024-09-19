import { FIELDS, FILTER_TYPES, TAXON_FILTER_TYPES } from '@/lib/constants'
import { Doc } from '@/types/response-data'
import { Link, To } from 'react-router-dom'

interface FieldsProps {
  doc: Doc
}

export const Fields = ({ doc }: FieldsProps) => (
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
