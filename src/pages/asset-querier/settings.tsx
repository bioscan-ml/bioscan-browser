import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ViewModeControl } from '@/components/view-mode-control'
import { Sort, SortOrder, ViewMode } from '@/types/settings'
import { FIELDS } from './fields'

interface SettingsProps {
  viewMode: ViewMode
  setViewMode: (viewMode: ViewMode) => void
  sort: Sort
  setSort: (sort: Sort) => void
}

export const Settings = ({
  viewMode,
  setViewMode,
  sort,
  setSort,
}: SettingsProps) => (
  <div className="space-y-8">
    {/* View mode */}
    <div className="space-y-2">
      <label className="text-sm font-medium">View mode</label>
      <ViewModeControl viewMode={viewMode} setViewMode={setViewMode} />
    </div>

    {/* Order by */}
    <div className="space-y-2 grow">
      <label className="text-sm font-medium">Order by</label>
      <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
        <Select
          value={sort.key}
          onValueChange={(value) => setSort({ ...sort, key: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a value" />
          </SelectTrigger>
          <SelectContent>
            {FIELDS.map((field) => (
              <SelectItem key={field.key} value={field.key}>
                {field.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={sort.order}
          onValueChange={(value: SortOrder) =>
            setSort({ ...sort, order: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">A-Z</SelectItem>
            <SelectItem value="desc">Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
)
