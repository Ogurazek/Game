import { PlayerAttempt } from '@/types/player-game'

interface Props {
  attempt: PlayerAttempt
  index: number
}

export default function PlayerFeedbackRow({ attempt, index }: Props) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/8">
      <span className="text-xs text-white/25 w-4 shrink-0">{index + 1}.</span>
      <span className="text-sm font-bold text-white/80 flex-1">{attempt.player.name}</span>
      <span className="text-red-400 text-xs font-semibold">No es</span>
    </div>
  )
}
