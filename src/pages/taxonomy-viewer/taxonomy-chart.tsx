import { Gallery } from '@/components/gallery'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import { Doc, TaxonomyTreeNode } from '@/types/response-data'
import { Fragment, useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

interface TaxonomyChartProps {
  docs?: Doc[]
  selectedNode?: TaxonomyTreeNode
  onBarClick: (nodeId: string) => void
  onItemClick: (doc: Doc) => void
}

const CHART_CONFIG = {
  records: {
    label: 'Records',
    color: '#99cc33',
  },
  children: {
    label: 'Children',
  },
} satisfies ChartConfig

export const TaxonomyChart = ({
  docs,
  selectedNode,
  onBarClick,
  onItemClick,
}: TaxonomyChartProps) => {
  const chartData = useMemo(() => {
    if (!selectedNode?.children) {
      return []
    }

    const chartData = selectedNode.children.map((child) => ({
      id: child.li_attr.id,
      name: child.li_attr.title,
      records: child.metadata.numInstances,
      children: child.metadata.numChildren,
    }))

    return chartData.sort((item1, item2) => item2.records - item1.records)
  }, [selectedNode])

  if (!selectedNode) {
    return null
  }

  return (
    <div>
      {chartData.length === 0 ? (
        <Gallery docs={docs} onItemClick={onItemClick} />
      ) : (
        <ChartContainer
          key={selectedNode.li_attr.id}
          config={CHART_CONFIG}
          className="w-full"
          style={{
            height: `${(chartData.length + 1) * 32 + 16}px`,
          }}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            maxBarSize={32}
            layout="vertical"
            margin={{
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
            }}
            onClick={(event) => {
              const [activePayload] = event.activePayload ?? []
              const nodeId = activePayload?.payload?.id
              if (nodeId) {
                onBarClick(nodeId)
              }
            }}
          >
            <CartesianGrid horizontal={false} />
            <XAxis
              dataKey="records"
              tickLine={false}
              axisLine={false}
              type="number"
              height={32}
              orientation="top"
              tickFormatter={xAxisTickFormatter}
            />
            <YAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              type="category"
              width={128}
              tickFormatter={yAxisTickFormatter}
            />
            <ChartTooltip content={<TaxonomyChartTooltip />} />
            <Bar dataKey="records" fill="var(--color-records)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  )
}

const TaxonomyChartTooltip = ({
  payload,
}: React.ComponentProps<typeof Tooltip>) => {
  if (!payload?.length) {
    return null
  }

  const [item] = payload

  return (
    <div className="bg-background px-2.5 py-1.5 space-y-1.5 rounded-lg border border-border/50 text-xs shadow-xl">
      <span className="font-medium">{item.payload.name}</span>
      <div
        className="grid gap-x-2.5 gap-y-0.5"
        style={{ gridTemplateColumns: 'auto auto' }}
      >
        {Object.entries(CHART_CONFIG).map(([key, { label }]) => (
          <Fragment key={key}>
            <span className="text-muted-foreground">{label}</span>
            <span className="font-mono font-medium tabular-nums text-foreground">
              {item.payload[key].toLocaleString()}
            </span>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

const xAxisTickFormatter = (value: number) => value.toLocaleString()

const yAxisTickFormatter = (value: string) => {
  const limit = 24
  if (value.length <= limit) {
    return value
  }
  return `${value.substring(0, limit - 3)}...`
}
