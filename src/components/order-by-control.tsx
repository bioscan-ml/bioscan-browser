import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Doc } from '@/types/response-data'
import { Sort, SortOrder } from '@/types/settings'
import { DicesIcon } from 'lucide-react'
import { Button } from './ui/button'

const VALUE_RANDOM = 'random'
interface OrderByControlProps {
  fields: { label: string; key: keyof Doc; sortDisabled?: boolean }[]
  sort: Sort
  setSort: (sort: Sort) => void
}

export const OrderByControl = ({
  fields,
  sort,
  setSort,
}: OrderByControlProps) => {
  const value = sort.key.includes(VALUE_RANDOM) ? VALUE_RANDOM : sort.key

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: '1fr auto' }}>
      <Select
        value={value}
        onValueChange={(value) => {
          if (value === VALUE_RANDOM) {
            const seed = new Date().getTime()
            setSort({ ...sort, key: `${VALUE_RANDOM}_${seed}` })
          } else {
            setSort({ ...sort, key: value })
          }
        }}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={VALUE_RANDOM}>Random</SelectItem>
          {fields
            .filter((field) => !field.sortDisabled)
            .map((field) => (
              <SelectItem key={field.key} value={field.key}>
                {field.label}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
      {value === VALUE_RANDOM ? (
        <Button
          className="shrink-0"
          size="icon"
          variant="outline"
          onClick={() => {
            const seed = new Date().getTime()
            setSort({ ...sort, key: `${VALUE_RANDOM}_${seed}` })
          }}
        >
          <DicesIcon className="w-4 h-4" />
        </Button>
      ) : (
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
      )}
    </div>
  )
}
