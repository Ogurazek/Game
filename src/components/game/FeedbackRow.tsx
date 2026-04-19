import { Attempt, Difficulty, FeedbackStatus, FIELDS_BY_DIFFICULTY, GuessFields } from '@/types/game'

const STATUS_STYLES: Record<FeedbackStatus, string> = {
  correct:   'bg-green-500/20  border-green-500/60  text-green-300',
  partial:   'bg-yellow-500/20 border-yellow-500/60 text-yellow-300',
  incorrect: 'bg-red-500/20    border-red-500/60    text-red-300',
  empty:     'bg-white/5       border-white/10      text-white/30',
}

const FIELD_LABELS: Record<keyof GuessFields, string> = {
  homeTeam: 'Local',
  awayTeam: 'Visitante',
  year: 'Año',
  competition: 'Competencia',
}

const FIELD_LABELS_NEUTRAL: Record<keyof GuessFields, string> = {
  homeTeam: 'Equipo A',
  awayTeam: 'Equipo B',
  year: 'Año',
  competition: 'Competencia',
}

interface Props {
  attempt: Attempt
  difficulty: Difficulty
  index: number
  neutral?: boolean
}

export default function FeedbackRow({ attempt, difficulty, index, neutral = false }: Props) {
  const activeFields = FIELDS_BY_DIFFICULTY[difficulty]
  const labels = neutral ? FIELD_LABELS_NEUTRAL : FIELD_LABELS

  return (
    <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-top-2 duration-300">

      {/* Número de intento */}
      <span className="w-6 text-xs text-white/20 font-mono text-right shrink-0">
        {index + 1}
      </span>

      {/* Campos */}
      <div className="flex gap-2 flex-1 flex-wrap">
        {activeFields.map((field) => {
          const status = attempt.feedback[field]
          const value = attempt.guess[field]
          return (
            <div
              key={field}
              className={`flex flex-col gap-0.5 px-3 py-2 rounded-xl border flex-1 min-w-0
                transition-all ${STATUS_STYLES[status]}`}
            >
              <span className="text-[10px] uppercase tracking-widest opacity-60">
                {labels[field]}
              </span>
              <span className="text-sm font-semibold truncate">
                {value || '—'}
              </span>
            </div>
          )
        })}
      </div>

    </div>
  )
}
