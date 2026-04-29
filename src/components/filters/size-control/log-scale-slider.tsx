import { Slider } from '@/components/ui/slider'

const EPSILON = 0.001
const MAX = 10000
const MIN = 0
const THUMB_SIZE = 20
const NUM_TICKS = 8

const round = (value: number) => parseFloat(value.toPrecision(2))

const toLog = (position: number) => {
  const minLog = Math.log(Math.max(MIN, EPSILON))
  const maxLog = Math.log(Math.max(MAX, EPSILON))
  const scale = (maxLog - minLog) / 100

  return position === 0 ? MIN : round(Math.exp(minLog + scale * position))
}

const toPosition = (value: number) => {
  const minLog = Math.log(Math.max(MIN, EPSILON))
  const maxLog = Math.log(Math.max(MAX, EPSILON))
  const scale = (maxLog - minLog) / 100

  return value <= MIN ? 0 : (Math.log(value) - minLog) / scale
}

interface LogScaleSliderProps {
  onValueChange: (value: number[]) => void
  value: number[]
}

export const LogScaleSlider = ({
  onValueChange,
  value,
}: LogScaleSliderProps) => (
  <div className="flex flex-col gap-4">
    <Slider
      min={0}
      max={100}
      step={toPosition(0.01)}
      value={[toPosition(value[0]), toPosition(value[1])]}
      onValueChange={(position) =>
        onValueChange([toLog(position[0]), toLog(position[1])])
      }
    />
    <div className="relative h-4">
      {Array.from(Array(NUM_TICKS)).map((_, index) => {
        const position = (index / (NUM_TICKS - 1)) * 100
        const left = `calc(${position}% * (100% - ${THUMB_SIZE}px) / 100% + ${THUMB_SIZE / 2}px)`

        return (
          <span
            key={index}
            className="absolute -translate-x-1/2 text-xs text-muted-foreground/50"
            style={{ left }}
          >
            {toLog(position).toLocaleString()}
          </span>
        )
      })}
    </div>
  </div>
)
