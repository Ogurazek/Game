'use client'

import { useMemo } from 'react'
import Image from 'next/image'
import { usePlayerGame } from '@/hooks/usePlayerGame'
import PlayerClues from '@/components/player-game/PlayerClues'
import PlayerFeedbackRow from '@/components/player-game/PlayerFeedbackRow'
import PlayerAutocomplete from '@/components/player-game/PlayerAutocomplete'
import AboutSheet from '@/components/game/AboutSheet'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'
import { Lock, Trophy, Skull, Target, Dumbbell, LockOpen, CheckCircle2, XCircle } from 'lucide-react'
import { PLAYERS_PER_LEVEL, DIFFICULTY_ORDER, Difficulty, MAX_ATTEMPTS, UNLOCK_THRESHOLD } from '@/types/player-game'

const WIN_GIFS = [
  '/gifs/davo-davooxeneize.gif',
  '/gifs/davo.gif',
  '/gifs/dagif.gif',
  '/gifs/davito4.gif',
  '/gifs/davitooooo.gif',
]

const DIFFICULTY_LABEL: Record<string, string> = {
  easy: 'Fácil', medium: 'Medio', hard: 'Difícil', expert: 'Experto',
}


function Background({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020613]">
      <AboutSheet>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Sobre el juego</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            <strong className="text-white/80">Adiviná el Jugador</strong> — a partir de pistas sobre un jugador
            (nacionalidad, posición, equipo, liga, edad y goles de carrera), tenés que adivinar de quién se trata.
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            En cada intento fallido, ves qué tan cerca estás en cada atributo. ¡Usá esa info para afinar tu próxima respuesta!
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Feedback</h3>
          <ul className="flex flex-col gap-2 text-sm text-white/60">
            {[
              { icon: '✓', color: 'text-green-400', text: 'Verde — atributo correcto' },
              { icon: '✗', color: 'text-red-400', text: 'Rojo — atributo incorrecto' },
              { icon: '↑', color: 'text-yellow-400', text: 'Flecha arriba — el real es mayor' },
              { icon: '↓', color: 'text-yellow-400', text: 'Flecha abajo — el real es menor' },
            ].map(({ icon, color, text }) => (
              <li key={text} className="flex items-center gap-2">
                <span className={`font-bold ${color}`}>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Créditos</h3>
          <div className="flex flex-col gap-2">
            {[
              { name: 'Perez Elías (Ogurazek)', role: 'Diseño & desarrollo' },
            ].map(({ name, role }) => (
              <div key={name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <span className="text-sm font-semibold text-white/80">{name}</span>
                <span className="text-xs text-white/30">{role}</span>
              </div>
            ))}
          </div>
        </section>
      </AboutSheet>
      <div className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #1a4fd6 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #f5a800 0%, transparent 70%)' }} />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        {children}
      </main>
    </div>
  )
}

const DIFFICULTY_CONFIG: Record<Difficulty, { label: string; color: string; border: string; glow: string; description: string }> = {
  easy: { label: 'Fácil', color: 'text-green-400', border: 'border-green-400/30 hover:border-green-400/80', glow: 'hover:shadow-green-400/20', description: 'Nac. · Pos. · Equipo · Liga · Edad · Goles' },
  medium: { label: 'Medio', color: 'text-yellow-400', border: 'border-yellow-400/30 hover:border-yellow-400/80', glow: 'hover:shadow-yellow-400/20', description: 'Nac. · Pos. · Equipo · Liga · Goles' },
  hard: { label: 'Difícil', color: 'text-orange-400', border: 'border-orange-400/30 hover:border-orange-400/80', glow: 'hover:shadow-orange-400/20', description: 'Nac. · Pos. · Equipo · Goles' },
  expert: { label: 'Experto', color: 'text-red-400', border: 'border-red-400/30 hover:border-red-400/80', glow: 'hover:shadow-red-400/20', description: 'Nac. · Pos. · Liga · Goles' },
}

const PREV_LABEL: Partial<Record<Difficulty, string>> = {
  medium: 'Fácil', hard: 'Medio', expert: 'Difícil',
}

function DifficultySelector({ onStart, unlockedDifficulties }: {
  onStart: (d: Difficulty) => void
  unlockedDifficulties: Difficulty[]
}) {
  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-5 w-full max-w-xl mx-auto">

        <div className="text-center flex flex-col items-center gap-3">
          <Image
            src="/PuerroXgameUnited.png"
            alt="Adiviná el Jugador"
            width={180}
            height={180}
            className="rounded-full"
            priority
          />
          <h1 className="text-4xl font-black tracking-tight text-white flex items-center gap-3">
            <Image src="/PuerroConLupa.png" alt="Puerro con lupa" width={44} height={44} />
            Adiviná el Jugador
          </h1>
          <p className="text-sm text-white/50 max-w-sm leading-relaxed">
            Te damos pistas de un jugador de fútbol y vos tenés que adivinar quién es.
            Cuanto más difícil el nivel, menos pistas y menos intentos. Cada intento fallido
            te muestra qué tan cerca estás en cada atributo.
          </p>
          <div className="flex items-center justify-center gap-4 mt-1 text-xs text-white/25">
            <span>Escribí el nombre</span>
            <span>·</span>
            <span>Feedback atributo a atributo</span>
            <span>·</span>
            <span>Intentos limitados</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          {(Object.entries(DIFFICULTY_CONFIG) as [Difficulty, typeof DIFFICULTY_CONFIG.easy][]).map(([diff, cfg]) => {
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
                      <p className="text-xs text-white/25 leading-relaxed">Bloqueado</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    Tenés que adivinar {UNLOCK_THRESHOLD}/{PLAYERS_PER_LEVEL} jugadores en <strong>{prevLabel}</strong> para desbloquear este nivel
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <button
                key={diff}
                onClick={() => onStart(diff)}
                className={`group flex flex-col gap-2 p-5 rounded-2xl border bg-white/[0.03]
                  transition-all duration-200 cursor-pointer hover:shadow-lg hover:-translate-y-0.5
                  ${cfg.border} ${cfg.glow}`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-lg font-bold ${cfg.color}`}>{cfg.label}</span>
                  <span className="text-xs text-white/30 font-mono">{MAX_ATTEMPTS[diff]} intentos</span>
                </div>
                <p className="text-xs text-white/40 text-left leading-relaxed">{cfg.description}</p>
              </button>
            )
          })}
        </div>

        <div className="flex gap-4 text-xs text-white/30">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" /> Correcto
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 inline-block" /> ↑↓ Dirección
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> Incorrecto
          </span>
        </div>

      </div>
    </TooltipProvider>
  )
}

export default function AdivinaElJugador() {
  const {
    difficulty,
    attempts,
    attemptsLeft,
    status,
    currentPlayerIndex,
    playerResults,
    lastResult,
    currentTarget,
    newlyUnlocked,
    hintsRevealed,
    stats,
    startGame,
    submitGuess,
    nextPlayer,
    useHint,
    resetGame,
  } = usePlayerGame()

  const guessedIds = attempts.map((a) => a.player.id)
  const winGif = useMemo(() => WIN_GIFS[Math.floor(Math.random() * WIN_GIFS.length)], [playerResults.length])

  // ── IDLE ──────────────────────────────────────────────────────────────────
  if (status === 'idle') {
    return (
      <Background>
        <div className="flex flex-col items-center gap-6 w-full max-w-xl">
          <DifficultySelector
            onStart={startGame}
            unlockedDifficulties={stats.unlockedDifficulties ?? ['easy']}
          />
          <div className="flex gap-4 w-full">
            {[
              { label: 'Puntaje total', value: stats.totalScore.toLocaleString() },
              { label: 'Niveles', value: stats.levelsPlayed },
              { label: 'Perfectos', value: stats.levelsPerfect },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                <span className="text-lg font-black text-white">{value}</span>
                <span className="text-[10px] uppercase tracking-widest text-white/30">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </Background>
    )
  }

  const currentDifficulty = difficulty!

  // ── BETWEEN PLAYERS ───────────────────────────────────────────────────────
  if (status === 'between_players' && lastResult) {
    const isLast = currentPlayerIndex >= PLAYERS_PER_LEVEL - 1
    const levelScore = playerResults.reduce((acc, r) => acc + r.score, 0)

    return (
      <Background>
        <div className="flex flex-col gap-5 w-full max-w-md">

          {/* Progreso */}
          <div className="flex gap-1.5">
            {Array.from({ length: PLAYERS_PER_LEVEL }).map((_, i) => {
              const result = playerResults[i]
              return (
                <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${result ? (result.won ? 'bg-green-500' : 'bg-red-500')
                    : i === currentPlayerIndex ? 'bg-white/30'
                      : 'bg-white/10'
                  }`} />
              )
            })}
          </div>

          {/* Resultado */}
          <div className={`flex flex-col items-center gap-3 p-6 rounded-3xl border text-center
            ${lastResult.won ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            {lastResult.won
              ? <Image src={winGif} alt="¡Correcto!" width={200} height={200} className="rounded-2xl" unoptimized />
              : <Image src="/gifs/Error.webp" alt="Error" width={200} height={200} className="rounded-2xl" />
            }
            <p className={`text-lg font-black ${lastResult.won ? 'text-green-400' : 'text-red-400'}`}>
              {lastResult.won ? '¡Correcto!' : 'No fue...'}
            </p>
            <div className="text-center">
              <p className="text-xl font-black text-white">{lastResult.target.name}</p>
              <p className="text-xs text-white/30 mt-0.5">
                {lastResult.target.nationality} · {lastResult.target.position} · {lastResult.target.team}
              </p>
            </div>
            {lastResult.won && (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30">
                <span className="text-yellow-400 font-black">+{lastResult.score}</span>
                <span className="text-yellow-400/60 text-xs uppercase tracking-widest">pts</span>
              </div>
            )}
            <p className="text-xs text-white/25">Jugador {currentPlayerIndex + 1} de {PLAYERS_PER_LEVEL}</p>
          </div>

          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-xs text-white/30 uppercase tracking-widest">Puntaje del nivel</span>
            <span className="text-white font-bold">{levelScore.toLocaleString()} pts</span>
          </div>

          <button
            onClick={nextPlayer}
            className="w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all cursor-pointer"
          >
            {isLast ? 'Ver resultado final →' : 'Siguiente jugador →'}
          </button>
        </div>
      </Background>
    )
  }

  // ── LEVEL DONE ────────────────────────────────────────────────────────────
  if (status === 'level_done') {
    const won = playerResults.filter((r) => r.won).length
    const total = playerResults.reduce((acc, r) => acc + r.score, 0)
    const perfect = won === PLAYERS_PER_LEVEL
    const zeroed = won === 0

    const UNLOCKED_LABEL: Record<string, string> = { medium: 'Medio', hard: 'Difícil', expert: 'Experto' }
    const nextDiff = DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(currentDifficulty) + 1] as Difficulty | undefined
    const canGoNext = nextDiff && stats.unlockedDifficulties.includes(nextDiff)

    return (
      <Background>
        <div className="flex flex-col gap-5 w-full max-w-md">

          <div className={`text-center p-7 rounded-3xl border
            ${perfect ? 'bg-yellow-400/10 border-yellow-400/30'
              : zeroed ? 'bg-red-500/10    border-red-500/30'
                : 'bg-white/[0.04] border-white/10'}`}>
            {perfect
              ? <Image src="/gifs/lacobra.gif" alt="¡Campeón!" width={200} height={200} className="rounded-2xl mx-auto mb-3" unoptimized />
              : <div className="flex justify-center mb-3">
                  {zeroed ? <Skull size={52} className="text-red-400" /> : won >= 3 ? <Target size={52} className="text-white/70" /> : <Dumbbell size={52} className="text-white/70" />}
                </div>
            }
            <h2 className={`text-2xl font-black ${perfect ? 'text-yellow-400' : zeroed ? 'text-red-400' : 'text-white'}`}>
              {perfect ? '¡Nivel perfecto!' : zeroed ? '¡No adivinaste ninguno!' : `${won} de ${PLAYERS_PER_LEVEL} adivinados`}
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-white">{total.toLocaleString()}</span>
              <span className="text-white/40 text-sm uppercase tracking-widest">pts</span>
            </div>
            <p className="mt-1 text-xs text-white/25">Total acumulado: {stats.totalScore.toLocaleString()} pts</p>
          </div>

          {newlyUnlocked && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30">
              <LockOpen size={22} className="text-yellow-400 shrink-0" />
              <div>
                <p className="text-sm font-bold text-yellow-400">¡Nivel {UNLOCKED_LABEL[newlyUnlocked]} desbloqueado!</p>
                <p className="text-xs text-yellow-400/50">Ya podés jugar el siguiente nivel de dificultad</p>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Resumen</span>
            {playerResults.map((r, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border
                ${r.won ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                {r.won
                  ? <CheckCircle2 size={18} className="text-green-400 shrink-0" />
                  : <XCircle size={18} className="text-red-400 shrink-0" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{r.target.name}</p>
                  <p className="text-xs text-white/30">{r.target.nationality} · {r.target.team}</p>
                </div>
                {r.won && <span className="text-xs font-bold text-yellow-400 shrink-0">+{r.score}</span>}
              </div>
            ))}
          </div>

          {currentDifficulty === 'expert' ? (
            <>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30">
                <Trophy size={22} className="text-yellow-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-yellow-400">¡Completaste el juego al 100%!</p>
                  <p className="text-xs text-yellow-400/50">Sos un crack del fútbol. No hay más niveles.</p>
                </div>
              </div>
              <button onClick={resetGame}
                className="w-full py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all cursor-pointer">
                Volver al inicio
              </button>
            </>
          ) : (
            <div className="flex gap-3">
              <button onClick={resetGame}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:bg-white/5 text-sm font-semibold transition-all cursor-pointer">
                Cambiar nivel
              </button>
              {canGoNext ? (
                <button onClick={() => startGame(nextDiff!)}
                  className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all cursor-pointer">
                  Siguiente nivel →
                </button>
              ) : (
                <button onClick={() => startGame(currentDifficulty)}
                  className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold hover:bg-white/90 transition-all cursor-pointer">
                  Jugar de nuevo
                </button>
              )}
            </div>
          )}

        </div>
      </Background>
    )
  }

  // ── PLAYING ───────────────────────────────────────────────────────────────
  if (!currentTarget) return null

  return (
    <Background>
      <div className="flex flex-col gap-3 w-full max-w-md">

        <div className="flex items-center justify-between">
          <button onClick={resetGame} className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer">
            ← Volver
          </button>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
            {DIFFICULTY_LABEL[currentDifficulty]} · Jugador {currentPlayerIndex + 1}/{PLAYERS_PER_LEVEL}
          </span>
        </div>

        {/* Progreso */}
        <div className="flex gap-1.5">
          {Array.from({ length: PLAYERS_PER_LEVEL }).map((_, i) => {
            const result = playerResults[i]
            return (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${result ? (result.won ? 'bg-green-500' : 'bg-red-500')
                  : i === currentPlayerIndex ? 'bg-white/40'
                    : 'bg-white/10'
                }`} />
            )
          })}
        </div>

        <PlayerClues target={currentTarget} difficulty={currentDifficulty} hintsRevealed={hintsRevealed} onUseHint={useHint} />

        {/* Intentos */}
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center justify-between text-xs text-white/30">
            <span>Intentos</span>
            <span className={attemptsLeft <= 1 ? 'text-red-400 font-bold' : ''}>
              {attemptsLeft} restante{attemptsLeft !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: MAX_ATTEMPTS[currentDifficulty] }).map((_, i) => {
              const used = MAX_ATTEMPTS[currentDifficulty] - attemptsLeft
              const isUsed = i < used
              const isLast = attemptsLeft === 1 && i === used
              return (
                <div key={i} className={`flex-1 h-2 rounded-full transition-all duration-300 ${
                  isUsed ? 'bg-red-500/70' : isLast ? 'bg-yellow-400 animate-pulse' : 'bg-white/15'
                }`} />
              )
            })}
          </div>
        </div>

        {attempts.length > 0 && (
          <div className="flex flex-col gap-2">
            {attempts.map((attempt, i) => (
              <PlayerFeedbackRow key={i} attempt={attempt} index={i} />
            ))}
          </div>
        )}

        <PlayerAutocomplete
          onSelect={submitGuess}
          excludeIds={guessedIds}
          disabled={false}
        />

      </div>
    </Background>
  )
}
