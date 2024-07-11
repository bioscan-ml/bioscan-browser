import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ExternalLinkIcon,
} from 'lucide-react'
import { useState } from 'react'
import { Badge } from './ui/badge'
import { Button, buttonVariants } from './ui/button'

interface ImagePickerProps {
  images: { id: string; src: string; thumbnail?: string; alt: string }[]
}

export const ImagePicker = ({ images }: ImagePickerProps) => {
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

  return (
    <div className="space-y-4">
      <div className="group aspect-[341/256] flex items-center justify-center relative bg-muted rounded-sm overflow-hidden">
        <img
          key={selectedImage.id}
          alt={selectedImage.alt}
          src={selectedImage.src}
        />
        <Badge variant="outline" className="absolute top-2 left-2">
          {selectedImage.alt}
        </Badge>
        <a
          href={selectedImage.src}
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
        <div className="opacity-0 group-hover:opacity-100">
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
      </div>
      <div className="flex justify-center gap-4">
        {images.map((image, index) => (
          <TooltipProvider key={image.id} delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <img
                  alt={image.id}
                  className={cn(
                    'w-12 rounded-sm ring-2 ring-background cursor-pointer',
                    {
                      ['opacity-50']: selectedImage.id !== image.id,
                    },
                  )}
                  src={image.thumbnail ?? image.src}
                  onClick={() => setSelectedIndex(index)}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>{image.alt}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  )
}
