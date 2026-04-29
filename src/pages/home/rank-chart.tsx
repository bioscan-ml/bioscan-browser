import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
} from '@/components/ui/chart'
import { Fragment } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

const CHART_CONFIG = {
  records: {
    label: 'Records',
  },
} satisfies ChartConfig

const CHART_DATA = [
  { rank: 'Phylum', records: 5150850, fill: colors.sky[800] },
  { rank: 'Class', records: 5146837, fill: colors.sky[700] },
  { rank: 'Order', records: 5134987, fill: colors.sky[600] },
  { rank: 'Family', records: 4932774, fill: colors.sky[500] },
  { rank: 'Subfamily', records: 1472548, fill: colors.sky[400] },
  { rank: 'Genus', records: 1226765, fill: colors.sky[300] },
  { rank: 'Species', records: 473094, fill: colors.sky[200] },
]

export const RankChart = () => (
  <div className="min-w-[480px] h-80">
    <ChartContainer config={CHART_CONFIG} className="w-full h-full">
      <BarChart
        accessibilityLayer
        data={CHART_DATA}
        layout="horizontal"
        margin={{
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
        }}
        maxBarSize={48}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="rank"
          tickLine={false}
          type="category"
        />
        <YAxis
          axisLine={false}
          dataKey="records"
          tickFormatter={(value: number) => value.toLocaleString()}
          tickLine={false}
          type="number"
        />
        <ChartTooltip content={<RankChartTooltip />} />
        <Bar dataKey="records" radius={4}>
          <LabelList
            dataKey="records"
            position="top"
            offset={12}
            className="fill-foreground"
            formatter={(value: number) => {
              const percent = (value / CHART_DATA[0].records) * 100

              return `${percent.toFixed(2).toLocaleString()}%`
            }}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  </div>
)

const RankChartTooltip = ({
  payload,
}: React.ComponentProps<typeof Tooltip>) => {
  if (!payload?.length) {
    return null
  }

  const [item] = payload

  return (
    <div className="bg-background px-2.5 py-1.5 space-y-1.5 rounded-lg border border-border/50 text-xs shadow-xl">
      <span className="font-medium">{item.payload.rank}</span>
      <div
        className="grid gap-x-2.5 gap-y-0.5"
        style={{ gridTemplateColumns: 'auto auto' }}
      >
        <Fragment>
          <span className="text-muted-foreground">Records</span>
          <span
            className="font-medium text-foreground"
            style={{ fontFamily: 'Source Code' }}
          >
            {item.payload.records.toLocaleString()}
          </span>
        </Fragment>
      </div>
    </div>
  )
}
