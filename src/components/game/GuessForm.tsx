'use client'

import { Difficulty, GuessFields, FIELDS_BY_DIFFICULTY } from '@/types/game'
import TeamInput from '@/components/game/TeamInput'
import { COMPETITIONS } from '@/data/teams'

const FIELD_LABELS: Record<keyof GuessFields, string> = {
  homeTeam: 'Equipo local',
  awayTeam: 'Equipo visitante',
  year: 'Año',
  competition: 'Competencia',
}

const FIELD_LABELS_NEUTRAL: Record<keyof GuessFields, string> = {
  homeTeam: 'Equipo A',
  awayTeam: 'Equipo B',
  year: 'Año',
  competition: 'Competencia',
}

const FIELD_PLACEHOLDERS: Record<keyof GuessFields, string> = {
  homeTeam: 'Ej: Barcelona',
  awayTeam: 'Ej: Real Madrid',
  year: 'Ej: 2014',
  competition: 'Ej: Champions League',
}

interface Props {
  difficulty: Difficulty
  currentGuess: GuessFields
  onFieldChange: (field: keyof GuessFields, value: string) => void
  onSubmit: () => void
  disabled?: boolean
  neutral?: boolean
}

export default function GuessForm({
  difficulty,
  currentGuess,
  onFieldChange,
  onSubmit,
  disabled = false,
  neutral = false,
}: Props) {
  const activeFields = FIELDS_BY_DIFFICULTY[difficulty]
  const labels = neutral ? FIELD_LABELS_NEUTRAL : FIELD_LABELS

  const isComplete = activeFields.every(
    (field) => currentGuess[field].trim().length > 0
  )

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!isComplete || disabled) return
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">

      <div className="grid grid-cols-2 gap-3">
        {activeFields.map((field) => {
          const isTeamField = field === 'homeTeam' || field === 'awayTeam'

          if (isTeamField) {
            return (
              <TeamInput
                key={field}
                label={labels[field]}
                value={currentGuess[field]}
                onChange={(val) => onFieldChange(field, val)}
                placeholder={FIELD_PLACEHOLDERS[field]}
                disabled={disabled}
              />
            )
          }

          if (field === 'competition') {
            return (
              <TeamInput
                key={field}
                label={labels[field]}
                value={currentGuess[field]}
                onChange={(val) => onFieldChange(field, val)}
                placeholder={FIELD_PLACEHOLDERS[field]}
                disabled={disabled}
                options={COMPETITIONS}
              />
            )
          }

          return (
            <div key={field} className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-widest text-white/40">
                {labels[field]}
              </label>
              <input
                type="number"
                value={currentGuess[field]}
                onChange={(e) => onFieldChange(field, e.target.value)}
                placeholder={FIELD_PLACEHOLDERS[field]}
                disabled={disabled}
                min={1900}
                max={new Date().getFullYear()}
                className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-white text-sm
                  placeholder:text-white/20 outline-none transition-all
                  focus:border-white/40 focus:bg-white/[0.09]
                  disabled:opacity-40 disabled:cursor-not-allowed
                  ${currentGuess[field] ? 'border-white/20' : 'border-white/10'}`}
              />
            </div>
          )
        })}
      </div>

      <button
        type="submit"
        disabled={!isComplete || disabled}
        className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider
          transition-all duration-200 cursor-pointer
          ${
            isComplete && !disabled
              ? 'bg-white text-black hover:bg-white/90 hover:scale-[1.01] active:scale-[0.99]'
              : 'bg-white/10 text-white/30 cursor-not-allowed'
          }`}
      >
        Adivinar
      </button>

    </form>
  )
}
