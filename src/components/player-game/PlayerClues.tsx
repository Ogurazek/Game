import { Lock } from 'lucide-react'
import { Player, Difficulty, CLUES_BY_DIFFICULTY, HINT_PENALTY } from '@/types/player-game'

interface Props {
  target: Player
  difficulty: Difficulty
  hintsRevealed: string[]
  onUseHint: (attr: string) => void
}

function BigClue({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-0.5 p-4 rounded-2xl bg-white/[0.04] border border-white/10">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{label}</span>
      <span className="text-2xl font-black text-white">{value}</span>
    </div>
  )
}

function Clue({ label, value, hinted = false }: { label: string; value: string; hinted?: boolean }) {
  return (
    <div className={`flex-1 flex flex-col gap-0.5 p-3 rounded-2xl border
      ${hinted ? 'bg-yellow-400/5 border-yellow-400/15' : 'bg-white/[0.04] border-white/10'}`}>
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{label}</span>
      <span className={`text-sm font-bold ${hinted ? 'text-yellow-300' : 'text-white'}`}>{value}</span>
    </div>
  )
}

function LockedClue({ label, onReveal }: { label: string; onReveal: () => void }) {
  return (
    <button
      onClick={onReveal}
      className="flex-1 flex flex-col gap-0.5 p-3 rounded-2xl bg-white/[0.02] border border-dashed border-white/10
        cursor-pointer hover:bg-white/[0.05] hover:border-white/20 transition-all text-left"
    >
      <span className="text-[10px] font-semibold uppercase tracking-widest text-white/20">{label}</span>
      <span className="flex items-center gap-1 text-xs text-white/25">
        <Lock size={10} />
        Pista (−{HINT_PENALTY} pts)
      </span>
    </button>
  )
}

export default function PlayerClues({ target, difficulty, hintsRevealed = [], onUseHint }: Props) {
  const c = CLUES_BY_DIFFICULTY[difficulty]

  function renderAttr(attr: string, show: boolean, label: string, value: string) {
    if (show) return <Clue key={attr} label={label} value={value} />
    if (hintsRevealed.includes(attr)) return <Clue key={attr} label={label} value={value} hinted />
    return <LockedClue key={attr} label={label} onReveal={() => onUseHint(attr)} />
  }

  return (
    <div className="w-full flex flex-col gap-2">

      <BigClue label="Posición" value={target.position} />
      <div className="flex gap-2">
        <BigClue label="Goles en carrera" value={String(target.careerGoals)} />
        <BigClue label="Asistencias en carrera" value={String(target.careerAssists)} />
      </div>

      <div className="flex gap-2">
        {renderAttr('nationality', c.showNationality, 'Nacionalidad', target.nationality)}
        {renderAttr('age', c.showAge, 'Edad', `${target.age} años`)}
      </div>

      <div className="flex gap-2">
        {renderAttr('team', c.showTeam, 'Equipo (Actual)', target.team)}
        {renderAttr('league', c.showLeague, 'Liga (Actual)', target.league)}
      </div>

    </div>
  )
}
