import { getTaxonomy } from '@/lib/getTaxonomy'
import { Doc } from '@/types/response-data'
import { ChevronRightIcon } from 'lucide-react'

interface TaxonomyHeaderProps {
  doc: Doc
}

export const TaxonomyHeader = ({ doc }: TaxonomyHeaderProps) => {
  const { determinationLabel, ranks } = getTaxonomy(doc)

  return (
    <div className="space-y-1">
      <div className="text-sm font-medium">{determinationLabel}</div>
      <div className="text-xs">
        {ranks.map((rank, index) => (
          <span key={index} className="inline-flex items-center">
            {rank}
            {index < ranks.length - 1 && (
              <ChevronRightIcon className="w-3 h-3 mx-1 opacity-50 inline" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
