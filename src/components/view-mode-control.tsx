import { ViewMode } from '@/types/settings'
import {
  BarChartHorizontalIcon,
  BarcodeIcon,
  Grid2X2Icon,
  SheetIcon,
} from 'lucide-react'
import { Button } from './ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const VIEW_MODE_OPTIONS = {
  search: [
    {
      label: 'Gallery',
      value: 'gallery',
      Icon: Grid2X2Icon,
    },
    {
      label: 'Table',
      value: 'table',
      Icon: SheetIcon,
    },
    {
      label: 'DNA barcode',
      value: 'dna-barcode',
      Icon: BarcodeIcon,
    },
  ],
  'taxonomy-tree': [
    {
      label: 'Gallery',
      value: 'gallery',
      Icon: Grid2X2Icon,
    },
    {
      label: 'Table',
      value: 'table',
      Icon: SheetIcon,
    },
    {
      label: 'DNA barcode',
      value: 'dna-barcode',
      Icon: BarcodeIcon,
    },
    {
      label: 'Chart',
      value: 'chart',
      Icon: BarChartHorizontalIcon,
    },
  ],
  'find-similar': [
    {
      label: 'Gallery',
      value: 'gallery',
      Icon: Grid2X2Icon,
    },
    {
      label: 'Table',
      value: 'table',
      Icon: SheetIcon,
    },
    {
      label: 'DNA barcode',
      value: 'dna-barcode',
      Icon: BarcodeIcon,
    },
  ],
}

interface ViewModeProps {
  type: 'search' | 'taxonomy-tree' | 'find-similar'
  viewMode: ViewMode
  setViewMode: (viewMode: ViewMode) => void
}

export const ViewModeControl = ({
  type,
  viewMode,
  setViewMode,
}: ViewModeProps) => (
  <div className="flex gap-2">
    {VIEW_MODE_OPTIONS[type].map(({ label, value, Icon }) => (
      <TooltipProvider key={value} delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              key={value}
              variant={viewMode === value ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode(value as ViewMode)}
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
