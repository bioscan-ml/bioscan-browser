import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { ReactNode, useEffect, useRef, useState } from 'react'

export const IntroCarousel = ({ children }: { children: ReactNode }) => {
  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }))
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div>
      <Carousel
        className="bg-muted rounded-md border mb-8"
        onMouseEnter={() => plugin.current.stop()}
        onMouseLeave={() => plugin.current.reset()}
        opts={{ loop: true }}
        plugins={[plugin.current]}
        setApi={setApi}
      >
        <CarouselContent>{children}</CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex items-center justify-center gap-3">
        {Array.from(Array(count).keys()).map((index) => (
          <Button
            key={index}
            className={cn('w-3 h-3 p-0 rounded-full bg-border', {
              'bg-primary': index === current,
            })}
            onClick={() => api?.scrollTo(index, true)}
          />
        ))}
      </div>
    </div>
  )
}
