'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalScore: number
  levelsPlayed: number
  levelsPerfect: number
  unlockedDifficulties: string[]
}

export default function GameCardStats({ storageKey, fallback }: { storageKey: string; fallback: string }) {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (!raw) return
      const parsed = JSON.parse(raw) as Stats
      if (parsed.levelsPlayed > 0) setStats(parsed)
    } catch {
      // noop
    }
  }, [storageKey])

  if (!stats) return <span>{fallback}</span>

  return <span>Jugar de nuevo →</span>
}
