export const Count = ({ count, label }: { count: number; label: string }) => (
  <div className="flex flex-col gap-4">
    <span className="text-5xl" style={{ fontFamily: 'Source Code' }}>
      {count.toLocaleString()}
    </span>
    <span className="body-base text-muted-foreground uppercase">{label}</span>
  </div>
)
