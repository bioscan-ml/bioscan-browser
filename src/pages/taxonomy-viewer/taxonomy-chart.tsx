import { Gallery } from '@/components/gallery'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Doc, TaxonomyTreeNode } from '@/types/response-data'
import { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts'

interface TaxonomyChartProps {
  docs?: Doc[]
  selectedNode?: TaxonomyTreeNode
  onBarClick: (nodeId: string) => void
  onItemClick: (doc: Doc) => void
}

const CHART_CONFIG = {
  count: {
    label: 'Count',
    color: '#99cc33',
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
      count: child.metadata.numInstances,
    }))

    return chartData.sort((item1, item2) => item2.count - item1.count)
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
            height: `${(chartData.length + 1) * 32}px`,
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
              dataKey="count"
              tickLine={false}
              axisLine={false}
              type="number"
              height={32}
              orientation="top"
            />
            <YAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              type="category"
              width={128}
              tickFormatter={tickFormatter}
            />
            <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
            <Bar dataKey="count" fill="var(--color-count)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  )
}

const tickFormatter = (value: string) => {
  const limit = 24
  if (value.length < limit) {
    return value
  }
  return `${value.substring(0, limit - 3)}...`
}
