import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  Table as TablePrimitive,
  TableRow,
} from '@/components/ui/table'
import { FIELDS } from '@/lib/constants'
import { formatFieldValue } from '@/lib/formatFieldValue'
import { getImageSrc } from '@/lib/getImageSrc'
import { Doc } from '@/types/response-data'
import { Sort } from '@/types/settings'
import { SortIcon } from './sort-icon'

interface TableProps {
  docs?: Doc[]
  sort?: Sort
  onRowClick: (doc: Doc) => void
  setSort?: (sort: Sort) => void
}

export const Table = ({ docs = [], sort, onRowClick, setSort }: TableProps) => (
  <TablePrimitive>
    <TableHeader>
      <TableRow>
        <TableHead />
        {FIELDS.map((field) => {
          const isSorted = sort?.key === field.key
          const ariaSort = isSorted
            ? sort?.order === 'asc'
              ? 'ascending'
              : 'descending'
            : undefined

          return (
            <TableHead key={field.key} aria-sort={ariaSort}>
              <button
                className="w-full h-full flex items-center gap-2 whitespace-nowrap"
                disabled={!setSort || field.sortDisabled}
                onClick={() => {
                  if (!setSort) {
                    return
                  }

                  setSort({
                    key: field.key,
                    order: isSorted
                      ? sort.order === 'asc'
                        ? 'desc'
                        : 'asc'
                      : 'asc',
                  })
                }}
              >
                {field.label}
                {isSorted && <SortIcon sort={sort} />}
              </button>
            </TableHead>
          )
        })}
      </TableRow>
    </TableHeader>
    <TableBody>
      {docs.map((doc) => (
        <TableRow
          key={doc.id}
          onClick={() => onRowClick(doc)}
          className="cursor-pointer"
        >
          <TableCell>
            <img
              alt={doc.id}
              className="w-16 min-w-16 aspect-[341/256] rounded-sm"
              loading="lazy"
              src={getImageSrc(doc)}
            />
          </TableCell>
          {FIELDS.map((field) => (
            <TableCell key={field.key} className="whitespace-nowrap">
              {formatFieldValue(doc[field.key])}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  </TablePrimitive>
)
