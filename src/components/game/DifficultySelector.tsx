'use client'

import { Difficulty, MAX_ATTEMPTS, UNLOCK_THRESHOLD, PREV_DIFFICULTY, MATCHES_PER_LEVEL } from '@/types/game'
import { GameMode } from '@/hooks/useGame'
import { useState } from 'react'
import Image from 'next/image'
import { Lock } from 'lucide-react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

const DIFFICULTY_CONFIG: Record<
  Difficulty,
  { label: string; color: string; border: string; glow: string; description: string }
> = {
  easy: {
    label: 'Fácil',
    color: 'text-green-400',
    border: 'border-green-400/30 hover:border-green-400/80',
    glow: 'hover:shadow-green-400/20',
    description: 'Resultado · Goleadores · Año · Competencia',
  },
  medium: {
    label: 'Medio',
    color: 'text-yellow-400',
    border: 'border-yellow-400/30 hover:border-yellow-400/80',
    glow: 'hover:shadow-yellow-400/20',
    description: 'Resultado · Goleadores · Competencia',
  },
  hard: {
    label: 'Difícil',
    color: 'text-orange-400',
    border: 'border-orange-400/30 hover:border-orange-400/80',
    glow: 'hover:shadow-orange-400/20',
    description: 'Resultado · Goleadores',
  },
  expert: {
    label: 'Experto',
    color: 'text-red-400',
    border: 'border-red-400/30 hover:border-red-400/80',
    glow: 'hover:shadow-red-400/20',
    description: 'Solo goleadores',
  },
}

const PREV_LABEL: Partial<Record<Difficulty, string>> = {
  medium: 'Fácil',
  hard:   'Medio',
  expert: 'Difícil',
}

interface Props {
  onStart:               (difficulty: Difficulty, mode: GameMode) => void
  unlockedDifficulties:  Difficulty[]
}

export default function DifficultySelector({ onStart, unlockedDifficulties }: Props) {
  const [mode, setMode] = useState<GameMode>('random')

  return (
    <TooltipProvider>
    <div className="flex flex-col items-center gap-8 w-full max-w-xl mx-auto">

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-3">
        <Image
          src="/PuerroXgame.png"
          alt="PuerroXGames logo"
          width={180}
          height={180}
          className="rounded-full"
          priority
        />
        <h1 className="text-4xl font-black tracking-tight text-white">
          ⚽ Adivina el Partido
        </h1>
        <p className="text-sm text-white/50 max-w-sm leading-relaxed">
          Te mostramos pistas de un partido histórico y vos tenés que adivinar
          los equipos, el año y la competencia. Cuanto más difícil el nivel,
          menos pistas y menos intentos.
          <br />
          <span className="text-white/25">(Créditos — Gastón Mogul)</span>
        </p>
        <div className="flex items-center justify-center gap-4 mt-1 text-xs text-white/25">
          <span>Adiviná el local y el visitante</span>
          <span>·</span>
          <span>Feedback intento a intento</span>
          <span>·</span>
          <span>Intentos limitados</span>
        </div>
      </div>

      {/* Modo de juego */}
      <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
        {(['random', 'daily'] as GameMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
              mode === m ? 'bg-white text-black' : 'text-white/50 hover:text-white'
            }`}
          >
            {m === 'random' ? '🎲 Aleatorio' : '📅 Partido del día'}
          </button>
        ))}
      </div>

      {/* Cards de dificultad */}
      <div className="grid grid-cols-2 gap-3 w-full">
        {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG.easy][]).map(
          ([diff, cfg]) => {
            const unlocked = unlockedDifficulties.includes(diff)
            const prevLabel = PREV_LABEL[diff]

            if (!unlocked) {
              return (
                <Tooltip key={diff}>
                  <TooltipTrigger asChild>
                    <div className="flex flex-col gap-2 p-5 rounded-2xl border border-white/5 bg-white/[0.02] opacity-50 select-none cursor-not-allowed">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white/30">{cfg.label}</span>
                        <Lock size={18} className="text-white/30" />
                      </div>
                      <p className="text-xs text-white/25 leading-relaxed">
                        Bloqueado
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Tenés que ganar {UNLOCK_THRESHOLD}/{MATCHES_PER_LEVEL} partidos en <strong>{prevLabel}</strong> para desbloquear este nivel
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <button
                key={diff}
                onClick={() => onStart(diff, mode)}
                className={`group flex flex-col gap-2 p-5 rounded-2xl border bg-white/[0.03]
                  transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5
                  ${cfg.border} ${cfg.glow}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</span>
                  <span className="text-xs text-white/30 font-mono">
                    {MAX_ATTEMPTS[diff]} intentos
                  </span>
                </div>
                <p className="text-xs text-white/40 text-left leading-relaxed">
                  {cfg.description}
                </p>
              </button>
            )
          }
        )}
      </div>

      {/* Leyenda */}
      <div className="flex gap-4 text-xs text-white/30">
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Correcto
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> Parcial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Incorrecto
        </span>
      </div>

    </div>
    </TooltipProvider>
  )
}
