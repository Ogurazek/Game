'use client'

import Image from 'next/image'
import { useGame } from '@/hooks/useGame'
import DifficultySelector from '@/components/game/DifficultySelector'
import ClueDisplay from '@/components/game/ClueDisplay'
import GuessForm from '@/components/game/GuessForm'
import FeedbackRow from '@/components/game/FeedbackRow'
import AttemptsCounter from '@/components/game/AttemptsCounter'
import MatchProgress from '@/components/game/MatchProgress'
import AboutSheet from '@/components/game/AboutSheet'
import { MATCHES_PER_LEVEL } from '@/types/game'

const DIFFICULTY_LABEL = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
  expert: 'Experto',
}

function Background({ children, stats }: { children: React.ReactNode, stats: import('@/types/game').PlayerStats }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020613]">
      <Image
        src="/PuerroxGameLogo.png"
        alt="PuerroXGames"
        width={280}
        height={280}
        className="fixed top-4 left-4 z-30 rounded-lg"
      />
      <AboutSheet stats={stats} />
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #1a4fd6 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #f5a800 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-20 w-[300px] h-[300px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <main className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        {children}
      </main>
    </div>
  )
}

// Muestra el partido revelado (usado en between_matches y level_done)
function MatchReveal({ match }: { match: { homeTeam: string; awayTeam: string; score: string; year: number; competition: string; scorers: string[] } }) {
  return (
    <div className="w-full p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-bold text-white flex-1 text-right">{match.homeTeam}</span>
        <span className="text-xl font-black text-white px-3 py-1 rounded-xl bg-white/10">{match.score}</span>
        <span className="text-sm font-bold text-white flex-1 text-left">{match.awayTeam}</span>
      </div>
      <div className="flex gap-3 text-xs text-white/40">
        <span>📅 {match.year}</span>
        <span>🏅 {match.competition}</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {match.scorers.map((s, i) => (
          <span key={i} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-white/10 text-white/50">
            <Image src="/balon.png" alt="gol" width={24} height={24} />
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const {
    match,
    difficulty,
    attempts,
    attemptsLeft,
    status,
    currentGuess,
    currentMatchIndex,
    matchResults,
    lastResult,
    newlyUnlocked,
    stats,
    startGame,
    setGuessField,
    submitGuess,
    nextMatch,
    resetGame,
  } = useGame()

  // ── IDLE ──────────────────────────────────────────────────────────────────
  if (status === 'idle') {
    return (
      <Background stats={stats}>
        <div className="flex flex-col items-center gap-6 w-full max-w-xl">
          <DifficultySelector
            onStart={startGame}
            unlockedDifficulties={stats.unlockedDifficulties ?? ['easy']}
          />
          <div className="flex gap-4 w-full">
            {[
              { label: 'Puntaje total', value: stats.totalScore.toLocaleString() },
              { label: 'Niveles',       value: stats.levelsPlayed },
              { label: 'Perfectos',     value: stats.levelsPerfect },
            ].map(({ label, value }) => (
              <div key={label} className="flex-1 flex flex-col items-center gap-1 p-3
                rounded-2xl bg-white/[0.04] border border-white/10">
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

  // ── BETWEEN MATCHES ───────────────────────────────────────────────────────
  if (status === 'between_matches' && lastResult) {
    const isLast = currentMatchIndex >= MATCHES_PER_LEVEL - 1
    const levelScore = matchResults.reduce((acc, r) => acc + r.score, 0)

    return (
      <Background stats={stats}>
        <div className="flex flex-col gap-5 w-full max-w-md">

          <MatchProgress
            matchResults={matchResults}
            currentMatchIndex={currentMatchIndex}
          />

          {/* Resultado del partido */}
          <div className={`flex flex-col items-center gap-2 p-6 rounded-3xl border text-center
            ${lastResult.won ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <span className="text-4xl">{lastResult.won ? '✅' : '❌'}</span>
            <p className={`text-lg font-black ${lastResult.won ? 'text-green-400' : 'text-red-400'}`}>
              {lastResult.won ? '¡Correcto!' : 'No fue...'}
            </p>
            {lastResult.won && (
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/30 mt-1">
                <span className="text-yellow-400 font-black">+{lastResult.score}</span>
                <span className="text-yellow-400/60 text-xs uppercase tracking-widest">pts</span>
              </div>
            )}
            <p className="text-xs text-white/25 mt-1">
              Partido {currentMatchIndex + 1} de {MATCHES_PER_LEVEL}
            </p>
          </div>

          {/* Partido revelado */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
              El partido era
            </span>
            <MatchReveal match={lastResult.match} />
          </div>

          {/* Puntaje parcial */}
          <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.04] border border-white/10">
            <span className="text-xs text-white/30 uppercase tracking-widest">Puntaje del nivel</span>
            <span className="text-white font-bold">{levelScore.toLocaleString()} pts</span>
          </div>

          <button
            onClick={nextMatch}
            className="w-full py-3.5 rounded-xl bg-white text-black text-sm font-bold
              hover:bg-white/90 transition-all cursor-pointer"
          >
            {isLast ? 'Ver resultado final →' : 'Siguiente partido →'}
          </button>

        </div>
      </Background>
    )
  }

  // ── LEVEL DONE ────────────────────────────────────────────────────────────
  if (status === 'level_done') {
    const won      = matchResults.filter((r) => r.won).length
    const total    = matchResults.reduce((acc, r) => acc + r.score, 0)
    const perfect  = won === MATCHES_PER_LEVEL

    const UNLOCKED_LABEL: Record<string, string> = {
      medium: 'Medio',
      hard:   'Difícil',
      expert: 'Experto',
    }

    return (
      <Background stats={stats}>
        <div className="flex flex-col gap-5 w-full max-w-md">

          {/* Header resultado */}
          <div className={`text-center p-7 rounded-3xl border
            ${perfect ? 'bg-yellow-400/10 border-yellow-400/30' : 'bg-white/[0.04] border-white/10'}`}>
            <div className="text-5xl mb-3">{perfect ? '🏆' : won >= 3 ? '🎯' : '💪'}</div>
            <h2 className={`text-2xl font-black ${perfect ? 'text-yellow-400' : 'text-white'}`}>
              {perfect ? '¡Nivel perfecto!' : `${won} de ${MATCHES_PER_LEVEL} adivinados`}
            </h2>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-white">{total.toLocaleString()}</span>
              <span className="text-white/40 text-sm uppercase tracking-widest">pts</span>
            </div>
            <p className="mt-1 text-xs text-white/25">
              Total acumulado: {stats.totalScore.toLocaleString()} pts
            </p>
          </div>

          {/* Banner de desbloqueo */}
          {newlyUnlocked && (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-yellow-400/10 border border-yellow-400/30">
              <span className="text-2xl">🔓</span>
              <div>
                <p className="text-sm font-bold text-yellow-400">
                  ¡Nivel {UNLOCKED_LABEL[newlyUnlocked]} desbloqueado!
                </p>
                <p className="text-xs text-yellow-400/50">
                  Ya podés jugar el siguiente nivel de dificultad
                </p>
              </div>
            </div>
          )}

          {/* Lista de partidos */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
              Resumen
            </span>
            {matchResults.map((r, i) => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border
                ${r.won ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                <span className="text-lg">{r.won ? '✅' : '❌'}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {r.match.homeTeam} {r.match.score} {r.match.awayTeam}
                  </p>
                  <p className="text-xs text-white/30">{r.match.competition} · {r.match.year}</p>
                </div>
                {r.won && (
                  <span className="text-xs font-bold text-yellow-400 shrink-0">+{r.score}</span>
                )}
              </div>
            ))}
          </div>

          {/* Botones */}
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 py-3 rounded-xl border border-white/10 text-white/50
                hover:bg-white/5 text-sm font-semibold transition-all cursor-pointer"
            >
              Cambiar nivel
            </button>
            <button
              onClick={() => startGame(currentDifficulty, 'random')}
              className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold
                hover:bg-white/90 transition-all cursor-pointer"
            >
              Jugar de nuevo
            </button>
          </div>

        </div>
      </Background>
    )
  }

  // ── PLAYING ───────────────────────────────────────────────────────────────
  if (!match) return null

  return (
    <Background stats={stats}>
      <div className="flex flex-col gap-5 w-full max-w-md">

        <div className="flex items-center justify-between">
          <button
            onClick={resetGame}
            className="text-xs text-white/30 hover:text-white/60 transition-colors cursor-pointer"
          >
            ← Volver
          </button>
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
            {DIFFICULTY_LABEL[currentDifficulty]} · Partido {currentMatchIndex + 1}/{MATCHES_PER_LEVEL}
          </span>
        </div>

        <MatchProgress
          matchResults={matchResults}
          currentMatchIndex={currentMatchIndex}
        />

        <ClueDisplay match={match} difficulty={currentDifficulty} />
        <AttemptsCounter difficulty={currentDifficulty} attemptsLeft={attemptsLeft} />

        {attempts.length > 0 && (
          <div className="flex flex-col gap-2">
            {attempts.map((attempt, i) => (
              <FeedbackRow key={i} attempt={attempt} difficulty={currentDifficulty} index={i} neutral={match.neutral} />
            ))}
          </div>
        )}

        <GuessForm
          difficulty={currentDifficulty}
          currentGuess={currentGuess}
          onFieldChange={setGuessField}
          onSubmit={submitGuess}
          neutral={match.neutral}
        />

      </div>
    </Background>
  )
}
