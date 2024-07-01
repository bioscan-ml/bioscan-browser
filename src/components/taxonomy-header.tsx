import { Doc } from '@/types/response-data'
import { ChevronRight } from 'lucide-react'

interface TaxonomyHeaderProps {
  doc: Doc
}

export const TaxonomyHeader = ({ doc }: TaxonomyHeaderProps) => {
  const taxonomy = [
    doc.phylum,
    doc.class,
    doc.order,
    doc.family,
    doc.subfamily,
    doc.genus,
    doc.species,
  ].filter((level) => !!level)

  const [determinationLabel] = taxonomy.splice(-1)

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">{determinationLabel}</div>
      <div className="text-xs">
        {taxonomy.map((level, index) => (
          <span key={index} className="inline-flex items-center">
            {level}
            {index < taxonomy.length - 1 && (
              <ChevronRight className="w-3 h-3 mx-1 opacity-50 inline" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
