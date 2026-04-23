'use client'

import { useState, useRef, useEffect } from 'react'
import { Player } from '@/types/player-game'
import { ALL_PLAYERS } from '@/data/players'

interface Props {
  onSelect: (player: Player) => void
  excludeIds?: string[]
  disabled?: boolean
}

function normalize(s: string) {
  return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export default function PlayerAutocomplete({ onSelect, excludeIds = [], disabled }: Props) {
  const [query, setQuery]           = useState('')
  const [open, setOpen]             = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const containerRef                = useRef<HTMLDivElement>(null)
  const itemRefs                    = useRef<(HTMLButtonElement | null)[]>([])

  const filtered = query.length >= 1
    ? ALL_PLAYERS
        .filter((p) => !excludeIds.includes(p.id) && normalize(p.name).includes(normalize(query)))
        .slice(0, 8)
    : []

  useEffect(() => {
    setActiveIndex(-1)
  }, [filtered.length, query])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function handleSelect(player: Player) {
    setQuery('')
    setOpen(false)
    setActiveIndex(-1)
    onSelect(player)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!open || filtered.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((prev) => {
        const next = prev < filtered.length - 1 ? prev + 1 : 0
        itemRefs.current[next]?.scrollIntoView({ block: 'nearest' })
        return next
      })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((prev) => {
        const next = prev > 0 ? prev - 1 : filtered.length - 1
        itemRefs.current[next]?.scrollIntoView({ block: 'nearest' })
        return next
      })
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (activeIndex >= 0 && filtered[activeIndex]) {
        handleSelect(filtered[activeIndex])
      }
    } else if (e.key === 'Escape') {
      setOpen(false)
      setActiveIndex(-1)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={query}
        disabled={disabled}
        onChange={(e) => { setQuery(e.target.value); setOpen(true) }}
        onFocus={() => setOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Escribí el nombre del jugador..."
        className="w-full px-4 py-3 rounded-xl bg-white/[0.06] border border-white/15 text-white
          placeholder-white/25 text-sm focus:outline-none focus:border-white/30 focus:bg-white/[0.08]
          transition-all disabled:opacity-40 disabled:cursor-not-allowed"
      />

      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 rounded-xl
          bg-[#0d1626] border border-white/15 overflow-hidden shadow-xl">
          {filtered.map((player, i) => (
            <button
              key={player.id}
              ref={(el) => { itemRefs.current[i] = el }}
              onMouseDown={() => handleSelect(player)}
              onMouseEnter={() => setActiveIndex(i)}
              className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors text-left cursor-pointer
                ${i === activeIndex ? 'bg-white/10' : 'hover:bg-white/8'}`}
            >
              <span className="text-sm font-semibold text-white">{player.name}</span>
              <span className="text-xs text-white/30">{player.nationality} · {player.position}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
