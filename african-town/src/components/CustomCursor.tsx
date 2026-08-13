import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const [label, setLabel] = useState('')

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    function handleMove(e: MouseEvent) {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`
        dotRef.current.style.top = `${e.clientY}px`
      }
      if (labelRef.current) {
        labelRef.current.style.left = `${e.clientX}px`
        labelRef.current.style.top = `${e.clientY - 28}px`
      }

      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      setLabel(target?.dataset.cursor ?? '')
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ width: label ? 44 : 8, height: label ? 44 : 8, background: label ? '#C6A15B' : '#F4EEE2' }}
      />
      <div ref={labelRef} className="cursor-label" style={{ opacity: label ? 1 : 0 }}>
        {label}
      </div>
    </>
  )
}
