import { Slider } from '@/components/ui/slider'

const EPSILON = 0.001

const round = (value: number) => parseFloat(value.toPrecision(2))

const toLog = ({
  max,
  min,
  position,
}: {
  max: number
  min: number
  position: number[]
}) => {
  const minLog = Math.log(Math.max(min, EPSILON))
  const maxLog = Math.log(Math.max(max, EPSILON))
  const scale = (maxLog - minLog) / 100

  return [
    position[0] === 0 ? min : round(Math.exp(minLog + scale * position[0])),
    position[1] === 0 ? min : round(Math.exp(minLog + scale * position[1])),
  ]
}

const toPosition = ({
  max,
  min,
  value,
}: {
  max: number
  min: number
  value: number[]
}) => {
  const minLog = Math.log(Math.max(min, EPSILON))
  const maxLog = Math.log(Math.max(max, EPSILON))
  const scale = (maxLog - minLog) / 100

  return [
    value[0] <= min ? 0 : (Math.log(value[0]) - minLog) / scale,
    value[1] <= min ? 0 : (Math.log(value[1]) - minLog) / scale,
  ]
}

interface LogScaleSliderProps {
  max: number
  min: number
  onValueChange: (value: number[]) => void
  steps: number
  value: number[]
}

export const LogScaleSlider = ({
  max,
  min,
  onValueChange,
  steps,
  value,
}: LogScaleSliderProps) => (
  <Slider
    min={0}
    max={100}
    step={100 / steps}
    value={toPosition({ max, min, value })}
    onValueChange={(position) => onValueChange(toLog({ max, min, position }))}
  />
)
