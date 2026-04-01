export const Count = ({ count, label }: { count: number; label: string }) => (
  <div className="flex flex-col gap-2 sm:gap-4">
    <span className="text-xl md:text-5xl" style={{ fontFamily: 'Source Code' }}>
      {count.toLocaleString()}
    </span>
    <span className="text-base text-muted-foreground">{label}</span>
  </div>
)
