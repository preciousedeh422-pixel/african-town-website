interface MeridianProps {
  label?: string
}

export default function Meridian({ label }: MeridianProps) {
  return (
    <div className="mx-auto flex max-w-6xl items-center gap-4 px-6 py-2 sm:px-10">
      <div className="meridian flex-1" />
      {label && <span className="eyebrow whitespace-nowrap">{label}</span>}
      <div className="meridian flex-1" />
    </div>
  )
}
