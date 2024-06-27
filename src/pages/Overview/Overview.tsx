import { PageContent } from '@/components/page-content'
import { PaginationBar } from '@/components/pagination-bar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useData } from '@/data/useData'
import { useState } from 'react'

export const Overview = () => {
  const [page, setPage] = useState(0)
  const { isPending, data } = useData({ page })

  return (
    <>
      <PageContent>
        <div className="mb-12 py-8 z-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Phylum</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Order</TableHead>
                <TableHead>Family</TableHead>
                <TableHead>Subfamily</TableHead>
                <TableHead>Genus</TableHead>
                <TableHead>Species</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.docs.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium whitespace-nowrap">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.phylum}</TableCell>
                  <TableCell>{row.class}</TableCell>
                  <TableCell>{row.order}</TableCell>
                  <TableCell>{row.family}</TableCell>
                  <TableCell>{row.subfamily}</TableCell>
                  <TableCell>{row.genus}</TableCell>
                  <TableCell>{row.species}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </PageContent>
      <PaginationBar
        page={page}
        setPage={setPage}
        data={data}
        isPending={isPending}
      />
    </>
  )
}
