import { SearchType } from '@/types/settings'
import { DnaIcon, ImageIcon } from 'lucide-react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const SEATCH_TYPE_OPTIONS = [
  {
    label: 'Image',
    value: 'Image',
    Icon: ImageIcon,
  },
  {
    label: 'DNA',
    value: 'DNA',
    Icon: DnaIcon,
  },
]

interface SearchTypeProps {
  searchType: SearchType
  setSearchType: (searchType: SearchType) => void
}

export const SearchTypeControl = ({
  searchType,
  setSearchType,
}: SearchTypeProps) => (
  <div className="flex gap-2">
    {SEATCH_TYPE_OPTIONS.map(({ label, value, Icon }) => (
      <TooltipProvider key={value} delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              key={value}
              variant={searchType === value ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setSearchType(value as SearchType)}
            >
              <Icon className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ))}
  </div>
)
