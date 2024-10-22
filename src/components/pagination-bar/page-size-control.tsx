import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PAGE_SIZE_OPTIONS } from '@/lib/constants'

interface PageSizeControlProps {
  numFound: number
  pageSize: number
  setPageSize: (pageSize: number) => void
}

export const PageSizeControl = ({
  numFound,
  pageSize,
  setPageSize,
}: PageSizeControlProps) => {
  const options = PAGE_SIZE_OPTIONS.some((option) => option === pageSize)
    ? PAGE_SIZE_OPTIONS
    : [...PAGE_SIZE_OPTIONS, pageSize].sort(
        (option1, option2) => option1 - option2,
      )

  return (
    <div className="flex items-center justify-center gap-2">
      <p className="text-sm whitespace-nowrap">Showing </p>
      <Select
        value={`${pageSize}`}
        onValueChange={(value) => setPageSize(Number(value))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={`${option}`}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-sm whitespace-nowrap">
        of {numFound.toLocaleString()} {numFound === 1 ? 'record' : 'records'}
      </p>
    </div>
  )
}
