import Image from 'next/image'
import { Match, Difficulty, CLUES_BY_DIFFICULTY } from '@/types/game'

interface Props {
  match: Match
  difficulty: Difficulty
  hintsRevealed?: number
}

export default function ClueDisplay({ match, difficulty, hintsRevealed = 0 }: Props) {
  const clues = CLUES_BY_DIFFICULTY[difficulty]
  const showYear        = clues.showYear        || hintsRevealed >= 1
  const showCompetition = clues.showCompetition || hintsRevealed >= 2

  return (
    <div className="w-full flex flex-col gap-3">

      {/* Resultado */}
      {clues.showScore && (
        <div className="flex flex-col items-center gap-1 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
            Resultado
          </span>
          <span className="text-5xl font-black text-white tracking-tight">
            {match.score}
          </span>
        </div>
      )}

      {/* Goleadores */}
      {clues.showScorers && (
        <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
            Goleadores
          </span>
          <div className="flex flex-wrap gap-2 mt-1">
            {match.scorers.map((scorer, i) => (
              <span
                key={i}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-white/80 border border-white/10"
              >
                <Image src="/balon.png" alt="gol" width={24} height={24} />
                {scorer}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Año y competencia en fila */}
      {(showYear || showCompetition) && (
        <div className="flex gap-3">
          {showYear && (
            <div className={`flex-1 flex flex-col gap-1 p-4 rounded-2xl border
              ${!clues.showYear ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/[0.04] border-white/10'}`}>
              <span className={`text-xs font-semibold uppercase tracking-widest
                ${!clues.showYear ? 'text-orange-400/60' : 'text-white/30'}`}>
                Año {!clues.showYear && '· pista'}
              </span>
              <span className="text-2xl font-bold text-white">{match.year}</span>
            </div>
          )}
          {showCompetition && (
            <div className={`flex-1 flex flex-col gap-1 p-4 rounded-2xl border
              ${!clues.showCompetition ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/[0.04] border-white/10'}`}>
              <span className={`text-xs font-semibold uppercase tracking-widest
                ${!clues.showCompetition ? 'text-orange-400/60' : 'text-white/30'}`}>
                Competencia {!clues.showCompetition && '· pista'}
              </span>
              <span className="text-lg font-bold text-white">{match.competition}</span>
            </div>
          )}
        </div>
      )}

    </div>
  )
}
