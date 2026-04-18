import { MatchResult, MATCHES_PER_LEVEL } from '@/types/game'

interface Props {
  matchResults:      MatchResult[]
  currentMatchIndex: number
  status:            'playing' | 'between_matches'
}

export default function MatchProgress({ matchResults, currentMatchIndex, status }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">

      <div className="flex items-center justify-between text-xs text-white/30">
        <span>Progreso del nivel</span>
        <span>{matchResults.length} / {MATCHES_PER_LEVEL}</span>
      </div>

      <div className="flex gap-2">
        {Array.from({ length: MATCHES_PER_LEVEL }).map((_, i) => {
          const result  = matchResults[i]
          const isDone  = i < matchResults.length
          const isCurrent = i === currentMatchIndex && !isDone

          return (
            <div
              key={i}
              className={`flex-1 h-2.5 rounded-full transition-all duration-500 ${
                isDone
                  ? result.won
                    ? 'bg-green-500'
                    : 'bg-red-500'
                  : isCurrent
                  ? 'bg-white animate-pulse'
                  : 'bg-white/10'
              }`}
            />
          )
        })}
      </div>

    </div>
  )
}
