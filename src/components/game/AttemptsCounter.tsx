import { Difficulty, MAX_ATTEMPTS } from '@/types/game'

interface Props {
  difficulty: Difficulty
  attemptsLeft: number
}

export default function AttemptsCounter({ difficulty, attemptsLeft }: Props) {
  const max = MAX_ATTEMPTS[difficulty]
  const used = max - attemptsLeft

  return (
    <div className="flex flex-col gap-2 w-full">

      {/* Barra + texto */}
      <div className="flex items-center justify-between text-xs text-white/30">
        <span>Intentos</span>
        <span className={attemptsLeft <= 1 ? 'text-red-400 font-bold' : ''}>
          {attemptsLeft} restante{attemptsLeft !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Círculos */}
      <div className="flex gap-1.5">
        {Array.from({ length: max }).map((_, i) => {
          const isUsed = i < used
          const isLast = attemptsLeft === 1 && i === used
          return (
            <div
              key={i}
              className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                isUsed
                  ? 'bg-red-500/70'
                  : isLast
                  ? 'bg-yellow-400 animate-pulse'
                  : 'bg-white/15'
              }`}
            />
          )
        })}
      </div>

    </div>
  )
}
