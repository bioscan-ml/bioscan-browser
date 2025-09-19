import { UploadIcon } from 'lucide-react'
import { useRef } from 'react'
import { Button } from './button'

export const UploadImage = ({
  onChange,
}: {
  onChange: (file?: File) => void
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        accept="image/png, image/gif, image/jpeg"
        ref={inputRef}
        className="hidden"
        type="file"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0]
          onChange(file)
        }}
      />
      <Button
        variant="outline"
        className="shrink-0"
        onClick={() => inputRef.current?.click()}
      >
        <UploadIcon className="w-4 h-4 mr-2" />
        Upload image
      </Button>
    </>
  )
}
