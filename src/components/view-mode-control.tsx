import { ViewMode } from '@/types/settings'
import { Grid2X2Icon, SheetIcon } from 'lucide-react'
import { Button } from './ui/button'

const VIEW_MODE_OPTIONS = [
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
]

interface ViewModeProps {
  viewMode: ViewMode
  setViewMode: (viewMode: ViewMode) => void
}

export const ViewModeControl = ({ viewMode, setViewMode }: ViewModeProps) => (
  <div className="flex gap-2">
    {VIEW_MODE_OPTIONS.map(({ label, value, Icon }) => (
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
