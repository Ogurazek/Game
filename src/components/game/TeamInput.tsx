'use client'

import { useState, useRef, useEffect } from 'react'
import { TEAMS } from '@/data/teams'

interface Props {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label: string
  disabled?: boolean
  options?: string[]
}

function normalize(str: string) {
  return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default function TeamInput({ value, onChange, placeholder, label, disabled = false, options = TEAMS }: Props) {
  const [open, setOpen] = useState(false)
  const [highlighted, setHighlighted] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = value.trim().length >= 1
    ? options.filter((t) => normalize(t).includes(normalize(value))).slice(0, 7)
    : []

  useEffect(() => { setHighlighted(0) }, [value])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || suggestions.length === 0) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlighted((h) => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      onChange(suggestions[highlighted])
      setOpen(false)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 relative">
      <label className="text-xs font-semibold uppercase tracking-widest text-white/40">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => { onChange(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-white text-sm
          placeholder:text-white/20 outline-none transition-all
          focus:border-white/40 focus:bg-white/[0.09]
          disabled:opacity-40 disabled:cursor-not-allowed
          ${value ? 'border-white/20' : 'border-white/10'}`}
      />

      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl border border-white/10
          bg-[#0d1627] shadow-xl overflow-y-auto max-h-48">
          {suggestions.map((team, i) => (
            <li
              key={`${team}-${i}`}
              onMouseDown={() => { onChange(team); setOpen(false) }}
              onMouseEnter={() => setHighlighted(i)}
              className={`px-4 py-2.5 text-sm cursor-pointer transition-colors
                ${i === highlighted ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'}`}
            >
              {team}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
