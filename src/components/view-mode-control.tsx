import { ViewMode } from '@/types/settings'
import { BarChartHorizontalIcon, Grid2X2Icon, SheetIcon } from 'lucide-react'
import { Button } from './ui/button'

const VIEW_MODE_OPTIONS = {
  'taxonomy-viewer': [
    {
      label: 'Gallery',
      value: 'gallery',
      Icon: Grid2X2Icon,
    },
    {
      label: 'Chart',
      value: 'chart',
      Icon: BarChartHorizontalIcon,
    },
  ],
  'asset-querier': [
    {
      label: 'Table',
      value: 'table',
      Icon: SheetIcon,
    },
    {
      label: 'Gallery',
      value: 'gallery',
      Icon: Grid2X2Icon,
    },
  ],
}

interface ViewModeProps {
  type: 'taxonomy-viewer' | 'asset-querier'
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
      <Button
        key={value}
        variant={viewMode === value ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setViewMode(value as ViewMode)}
      >
        <Icon className="w-4 h-4 mr-2" />
        {label}
      </Button>
    ))}
  </div>
)
