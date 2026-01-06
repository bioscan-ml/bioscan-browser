import { ReactNode, useRef } from 'react'
import { Button } from './button'

export const UploadImage = ({
  children,
  className,
  onChange,
}: {
  children: ReactNode
  className?: string
  onChange: (file?: File) => void
}) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <>
      <input
        accept="image/png, image/gif, image/jpeg"
        className="hidden"
        onChange={(e) => {
          const file = e.currentTarget.files?.[0]
          onChange(file)
        }}
        ref={inputRef}
        type="file"
      />
      <Button
        className={className}
        onClick={() => inputRef.current?.click()}
        size="default"
        variant="outline"
      >
        {children}
      </Button>
    </>
  )
}
