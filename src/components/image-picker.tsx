import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { ExternalLinkIcon } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from './ui/button'

interface ImagePickerProps {
  images: { id: string; src: string; thumbnail?: string; alt: string }[]
}

export const ImagePicker = ({ images }: ImagePickerProps) => {
  const [selectedImage, setSelectedImage] = useState(images[0])

  return (
    <div className="space-y-4">
      <div className="aspect-[341/256] flex items-center justify-center relative bg-muted rounded-sm overflow-hidden">
        <img
          key={selectedImage.id}
          alt={selectedImage.alt}
          src={selectedImage.src}
        />
        <div className="absolute bottom-2 right-2">
          <a
            href={selectedImage.src}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'icon',
            })}
          >
            <ExternalLinkIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        {images.map((image) => (
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
                  onClick={() => setSelectedImage(image)}
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
