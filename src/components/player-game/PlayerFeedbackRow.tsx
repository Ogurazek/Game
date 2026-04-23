import { PlayerAttempt, ComparisonResult } from '@/types/player-game'

interface Props {
  attempt: PlayerAttempt
  index: number
}

function BoolChip({ value, label }: { value: 'correct' | 'incorrect'; label: string }) {
  const ok = value === 'correct'
  return (
    <div className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-center min-w-[52px]
      ${ok ? 'bg-green-500/15 border border-green-500/30' : 'bg-red-500/15 border border-red-500/30'}`}>
      <span className={`text-xs font-bold leading-none ${ok ? 'text-green-400' : 'text-red-400'}`}>
        {ok ? '✓' : '✗'}
      </span>
      <span className={`text-[9px] uppercase tracking-wide leading-none mt-0.5 ${ok ? 'text-green-400/60' : 'text-red-400/60'}`}>
        {label}
      </span>
    </div>
  )
}

function CompareChip({ value, label }: { value: ComparisonResult; label: string }) {
  const isCorrect = value === 'correct'
  const arrow = value === 'higher' ? '↑' : value === 'lower' ? '↓' : ''
  const color = isCorrect
    ? 'bg-green-500/15 border-green-500/30 text-green-400'
    : 'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
  const subColor = isCorrect ? 'text-green-400/60' : 'text-yellow-400/50'

  return (
    <div className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg text-center min-w-[52px] border ${color}`}>
      <span className="text-xs font-bold leading-none">{isCorrect ? '✓' : arrow}</span>
      <span className={`text-[9px] uppercase tracking-wide leading-none mt-0.5 ${subColor}`}>{label}</span>
    </div>
  )
}

export default function PlayerFeedbackRow({ attempt, index }: Props) {
  const { player, feedback } = attempt

  return (
    <div className="flex flex-col gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/8">
      <div className="flex items-center gap-2">
        <span className="text-xs text-white/25 w-4 shrink-0">{index + 1}.</span>
        <span className="text-sm font-bold text-white/80">{player.name}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <BoolChip    value={feedback.nationality}   label="Nac."   />
        <BoolChip    value={feedback.position}      label="Pos."   />
        <BoolChip    value={feedback.team}          label="Equipo" />
        <BoolChip    value={feedback.league}        label="Liga"   />
        <CompareChip value={feedback.age}           label="Edad"   />
        <CompareChip value={feedback.careerGoals}   label="Goles"  />
        <CompareChip value={feedback.careerAssists} label="Asist." />
      </div>
    </div>
  )
}
