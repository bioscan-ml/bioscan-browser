import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/cn'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import { ReactNode, useMemo, useState } from 'react'
import { Badge } from './ui/badge'
import { Button, buttonVariants } from './ui/button'

const MAX_COUNT = 5

interface ImagePickerProps {
  images: {
    attribution?: string
    badge: string
    id: string
    original?: string
    src: string
    thumbnail?: string
    tooltip?: string
  }[]
}

export const ImagePicker = ({ images: _images }: ImagePickerProps) => {
  const images = useMemo(() => _images.slice(0, MAX_COUNT), [_images])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  const goToPrev = () => {
    const prevIndex = selectedIndex - 1
    if (prevIndex < 0) {
      setSelectedIndex(images.length - 1)
    } else {
      setSelectedIndex(prevIndex)
    }
  }

  const goToNext = () => {
    const nextIndex = selectedIndex + 1
    if (nextIndex > images.length - 1) {
      setSelectedIndex(0)
    } else {
      setSelectedIndex(nextIndex)
    }
  }

  if (!selectedImage) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="group aspect-[341/256] flex items-center justify-center rounded-sm border bg-muted overflow-hidden relative">
        <img
          className="max-w-full max-h-full"
          key={selectedImage.id}
          alt={selectedImage.badge}
          src={selectedImage.src}
        />
        <Badge variant="outline" className="absolute top-2 left-2">
          {selectedImage.badge}
        </Badge>
        {selectedImage.attribution && (
          <Badge
            variant="outline"
            className="absolute bottom-2 left-2 max-w-[calc(100%-4rem)]"
          >
            {selectedImage.attribution}
          </Badge>
        )}
        <a
          href={selectedImage.original ?? selectedImage.src}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'absolute bottom-2 right-2',
            buttonVariants({
              variant: 'outline',
              size: 'icon',
            }),
          )}
        >
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
        {images.length > 1 && (
          <div className="hidden sm:group-hover:block">
            <Button
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full"
              variant="outline"
              size="icon"
              onClick={goToPrev}
            >
              <ChevronLeftIcon className="w-4 h-4" />
            </Button>
            <Button
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full"
              variant="outline"
              size="icon"
              onClick={goToNext}
            >
              <ChevronRightIcon className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex justify-center gap-4">
          {images.map((image, index) => (
            <ThumbnailWrapper key={image.id} tooltip={image.tooltip}>
              <img
                alt={image.id}
                className={cn(
                  'w-12 rounded-sm ring-2 ring-background cursor-pointer aspect-square object-cover',
                  {
                    ['opacity-50']: selectedImage.id !== image.id,
                  },
                )}
                src={image.thumbnail ?? image.src}
                onClick={() => setSelectedIndex(index)}
              />
            </ThumbnailWrapper>
          ))}
        </div>
      )}
    </div>
  )
}

const ThumbnailWrapper = ({
  tooltip,
  children,
}: {
  tooltip?: string
  children: ReactNode
}) => {
  if (!tooltip) {
    return children
  }

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
