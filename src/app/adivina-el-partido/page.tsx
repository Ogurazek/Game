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
import { MATCHES_PER_LEVEL, HINT_PENALTY, DIFFICULTY_ORDER, Difficulty } from '@/types/game'

const DIFFICULTY_LABEL = {
  easy: 'Fácil',
  medium: 'Medio',
  hard: 'Difícil',
  expert: 'Experto',
}

function Background({ children, stats }: { children: React.ReactNode, stats: import('@/types/game').PlayerStats }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020613]">

      <AboutSheet>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Sobre el juego</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            <strong className="text-white/80">Adiviná el Partido</strong> es un juego donde tenés que
            identificar partidos históricos del fútbol a partir de pistas. Hay 4 niveles de dificultad,
            cada uno con 5 partidos para resolver.
          </p>
          <p className="text-sm text-white/60 leading-relaxed">
            Cuanto menos intentos uses, más puntos ganás. ¡Desbloqueá todos los niveles y buscá el puntaje perfecto!
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Cómo jugar</h3>
          <ul className="flex flex-col gap-2 text-sm text-white/60">
            {[
              { icon: '🟢', text: 'Verde — respuesta correcta' },
              { icon: '🟡', text: 'Amarillo — equipo correcto, lado incorrecto / año cercano' },
              { icon: '🔴', text: 'Rojo — respuesta incorrecta' },
            ].map(({ icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <span>{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </section>

        {stats.levelsPlayed > 0 && (
          <section className="flex flex-col gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Tus estadísticas</h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Puntaje', value: stats.totalScore.toLocaleString() },
                { label: 'Niveles', value: stats.levelsPlayed },
                { label: 'Perfectos', value: stats.levelsPerfect },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/[0.04] border border-white/10">
                  <span className="text-base font-black text-white">{value}</span>
                  <span className="text-[10px] uppercase tracking-widest text-white/30">{label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        <section className="flex flex-col gap-2 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-white/70 leading-relaxed">
            ¿Te gustó el juego? Podemos agregar más niveles, más partidos y nuevos modos de juego.
          </p>
          <p className="text-sm text-white/50 leading-relaxed">
            Mandanos feedback o sugerencias — cada idea ayuda a mejorar la experiencia. 🚀
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Créditos</h3>
          <div className="flex flex-col gap-2">
            {[
              { name: 'Gastón Mogul', role: 'Idea & contenido' },
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

export default function PuerroXGame() {
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
    hintsRevealed,
    stats,
    startGame,
    setGuessField,
    submitGuess,
    nextMatch,
    useHint,
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
              { label: 'Niveles', value: stats.levelsPlayed },
              { label: 'Perfectos', value: stats.levelsPerfect },
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

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">
              El partido era
            </span>
            <MatchReveal match={lastResult.match} />
          </div>

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

  // ── EXPERT CHAMPION ───────────────────────────────────────────────────────
  if (status === 'level_done' && difficulty === 'expert') {
    const won = matchResults.filter((r) => r.won).length
    const total = matchResults.reduce((acc, r) => acc + r.score, 0)
    const zeroed = won === 0

    return (
      <Background stats={stats}>
        <div className="flex flex-col gap-5 w-full max-w-md">

          <div className={`relative text-center p-8 rounded-3xl border overflow-hidden
            ${zeroed
              ? 'border-red-500/40 bg-gradient-to-b from-red-500/10 to-red-900/10'
              : 'border-yellow-400/40 bg-gradient-to-b from-yellow-400/10 to-blue-500/10'}`}>
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `radial-gradient(circle, ${zeroed ? '#ef4444' : '#f5a800'} 1px, transparent 1px)`,
                backgroundSize: '20px 20px',
              }}
            />
            <div className="text-7xl mb-4">{zeroed ? '💀' : '🏆'}</div>
            <h1 className={`text-5xl font-black tracking-tight drop-shadow-lg
              ${zeroed ? 'text-red-400' : 'text-yellow-400'}`}>
              {zeroed ? 'ELIMINADO' : 'CAMPEÓN'}
            </h1>
            <p className={`mt-2 text-sm uppercase tracking-widest font-semibold
              ${zeroed ? 'text-red-400/60' : 'text-yellow-400/60'}`}>
              {zeroed ? 'No adivinaste ninguno en Experto' : 'Nivel Experto completado'}
            </p>
            {zeroed && (
              <p className="mt-2 text-xs text-red-400/40">
                Seguí entrenando, ¡la próxima va!
              </p>
            )}
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="text-4xl font-black text-white">{total.toLocaleString()}</span>
              <span className="text-white/40 text-sm uppercase tracking-widest">pts</span>
            </div>
            <p className="mt-1 text-xs text-white/25">
              {won} de {MATCHES_PER_LEVEL} adivinados · Total acumulado: {stats.totalScore.toLocaleString()} pts
            </p>
          </div>

          <div className="text-center py-3 px-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <p className="text-sm text-blue-300/70 italic">💙💛 Dedicada a Davo Xeneize</p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/30">Resumen</span>
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
                {r.won && <span className="text-xs font-bold text-yellow-400 shrink-0">+{r.score}</span>}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 py-3 rounded-xl border border-white/10 text-white/50
                hover:bg-white/5 text-sm font-semibold transition-all cursor-pointer"
            >
              Cambiar nivel
            </button>
            <button
              onClick={() => startGame(currentDifficulty)}
              className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer
                ${zeroed
                  ? 'bg-red-500 text-white hover:bg-red-400'
                  : 'bg-yellow-400 text-black hover:bg-yellow-300'}`}
            >
              Jugar de nuevo
            </button>
          </div>

        </div>
      </Background>
    )
  }

  // ── LEVEL DONE ────────────────────────────────────────────────────────────
  if (status === 'level_done') {
    const won = matchResults.filter((r) => r.won).length
    const total = matchResults.reduce((acc, r) => acc + r.score, 0)
    const perfect = won === MATCHES_PER_LEVEL
    const zeroed = won === 0

    const UNLOCKED_LABEL: Record<string, string> = {
      medium: 'Medio',
      hard: 'Difícil',
      expert: 'Experto',
    }

    const nextDiff = DIFFICULTY_ORDER[DIFFICULTY_ORDER.indexOf(currentDifficulty) + 1] as Difficulty | undefined
    const canGoNext = nextDiff && stats.unlockedDifficulties.includes(nextDiff)

    return (
      <Background stats={stats}>
        <div className="flex flex-col gap-5 w-full max-w-md">

          <div className={`text-center p-7 rounded-3xl border
            ${perfect ? 'bg-yellow-400/10 border-yellow-400/30'
              : zeroed ? 'bg-red-500/10 border-red-500/30'
                : 'bg-white/[0.04] border-white/10'}`}>
            <div className="text-5xl mb-3">
              {perfect ? '🏆' : zeroed ? '💀' : won >= 3 ? '🎯' : '💪'}
            </div>
            <h2 className={`text-2xl font-black
              ${perfect ? 'text-yellow-400' : zeroed ? 'text-red-400' : 'text-white'}`}>
              {perfect ? '¡Nivel perfecto!' : zeroed ? '¡No adivinaste ninguno!' : `${won} de ${MATCHES_PER_LEVEL} adivinados`}
            </h2>
            {zeroed && (
              <p className="mt-2 text-sm text-red-400/60">
                Seguí entrenando, ¡la próxima va!
              </p>
            )}
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="text-3xl font-black text-white">{total.toLocaleString()}</span>
              <span className="text-white/40 text-sm uppercase tracking-widest">pts</span>
            </div>
            <p className="mt-1 text-xs text-white/25">
              Total acumulado: {stats.totalScore.toLocaleString()} pts
            </p>
          </div>

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

          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="flex-1 py-3 rounded-xl border border-white/10 text-white/50
                hover:bg-white/5 text-sm font-semibold transition-all cursor-pointer"
            >
              Cambiar nivel
            </button>
            {canGoNext ? (
              <button
                onClick={() => startGame(nextDiff!)}
                className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold
                  hover:bg-white/90 transition-all cursor-pointer"
              >
                Siguiente nivel →
              </button>
            ) : (
              <button
                onClick={() => startGame(currentDifficulty)}
                className="flex-1 py-3 rounded-xl bg-white text-black text-sm font-bold
                  hover:bg-white/90 transition-all cursor-pointer"
              >
                Jugar de nuevo
              </button>
            )}
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

        <ClueDisplay match={match} difficulty={currentDifficulty} hintsRevealed={hintsRevealed} />

        {(currentDifficulty === 'hard' || currentDifficulty === 'expert') && (
          <button
            onClick={useHint}
            disabled={hintsRevealed >= 2}
            className={`w-full py-2.5 rounded-xl text-sm font-semibold border transition-all cursor-pointer
              ${hintsRevealed >= 2
                ? 'border-white/5 text-white/20 cursor-not-allowed'
                : 'border-orange-500/30 text-orange-400/70 hover:bg-orange-500/10 hover:text-orange-400'
              }`}
          >
            {hintsRevealed >= 2
              ? 'Sin pistas disponibles'
              : `💡 Ver pista (−${HINT_PENALTY[currentDifficulty]} pts)`}
          </button>
        )}

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
