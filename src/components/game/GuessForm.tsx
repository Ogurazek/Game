'use client'

import { Difficulty, GuessFields, FIELDS_BY_DIFFICULTY } from '@/types/game'

const FIELD_LABELS: Record<keyof GuessFields, string> = {
  homeTeam: 'Equipo local',
  awayTeam: 'Equipo visitante',
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
}

export default function GuessForm({
  difficulty,
  currentGuess,
  onFieldChange,
  onSubmit,
  disabled = false,
}: Props) {
  const activeFields = FIELDS_BY_DIFFICULTY[difficulty]

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

      {/* Inputs */}
      <div className="grid grid-cols-2 gap-3">
        {activeFields.map((field) => (
          <div key={field} className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase tracking-widest text-white/40">
              {FIELD_LABELS[field]}
            </label>
            <input
              type={field === 'year' ? 'number' : 'text'}
              value={currentGuess[field]}
              onChange={(e) => onFieldChange(field, e.target.value)}
              placeholder={FIELD_PLACEHOLDERS[field]}
              disabled={disabled}
              min={field === 'year' ? 1900 : undefined}
              max={field === 'year' ? new Date().getFullYear() : undefined}
              className={`w-full px-4 py-3 rounded-xl bg-white/[0.06] border text-white text-sm
                placeholder:text-white/20 outline-none transition-all
                focus:border-white/40 focus:bg-white/[0.09]
                disabled:opacity-40 disabled:cursor-not-allowed
                ${currentGuess[field] ? 'border-white/20' : 'border-white/10'}`}
            />
          </div>
        ))}
      </div>

      {/* Botón */}
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
