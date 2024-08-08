import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Doc } from '@/types/response-data'
import { Sort, SortOrder } from '@/types/settings'

interface OrderByControlProps {
  fields: { label: string; key: keyof Doc }[]
  sort: Sort
  setSort: (sort: Sort) => void
}

export const OrderByControl = ({
  fields,
  sort,
  setSort,
}: OrderByControlProps) => (
  <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
    <Select
      value={sort.key}
      onValueChange={(value) => setSort({ ...sort, key: value })}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a value" />
      </SelectTrigger>
      <SelectContent>
        {fields.map((field) => (
          <SelectItem key={field.key} value={field.key}>
            {field.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    <Select
      value={sort.order}
      onValueChange={(value: SortOrder) => setSort({ ...sort, order: value })}
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
)
