import { Sort } from '@/types/settings'
import {
  ArrowDown01Icon,
  ArrowDownAZIcon,
  ArrowUp01Icon,
  ArrowUpAZIcon,
} from 'lucide-react'

export const SortIcon = ({ sort: { key, order } }: { sort: Sort }) => {
  if (key === 'organism_area_mm2') {
    if (order === 'desc') {
      return <ArrowUp01Icon className="w-4 h-4" />
    }

    return <ArrowDown01Icon className="w-4 h-4" />
  }

  if (order === 'desc') {
    return <ArrowUpAZIcon className="w-4 h-4" />
  }

  return <ArrowDownAZIcon className="w-4 h-4" />
}
