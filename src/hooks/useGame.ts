'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Difficulty,
  Match,
  GuessFields,
  FieldFeedback,
  Attempt,
  MatchResult,
  PlayerStats,
  FIELDS_BY_DIFFICULTY,
  MAX_ATTEMPTS,
  MATCHES_PER_LEVEL,
  DIFFICULTY_ORDER,
  UNLOCK_THRESHOLD,
  calcScore,
} from '@/types/game'
import { getMatchesForLevel } from '@/data/matches'

// ─── Validación ──────────────────────────────────────────────────────────────

function normalize(str: string): string {
  return str.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function validateGuess(guess: GuessFields, match: Match, difficulty: Difficulty): FieldFeedback {
  const activeFields = FIELDS_BY_DIFFICULTY[difficulty]

  const fb: FieldFeedback = {
    homeTeam: 'empty',
    awayTeam: 'empty',
    year: 'empty',
    competition: 'empty',
  }

  if (activeFields.includes('homeTeam') || activeFields.includes('awayTeam')) {
    const gHome = normalize(guess.homeTeam)
    const gAway = normalize(guess.awayTeam)
    const rHome = normalize(match.homeTeam)
    const rAway = normalize(match.awayTeam)

    if (match.neutral) {
      fb.homeTeam = gHome === rHome || gHome === rAway ? 'correct' : 'incorrect'
      fb.awayTeam = gAway === rAway || gAway === rHome ? 'correct' : 'incorrect'
    } else {
      fb.homeTeam = gHome === rHome ? 'correct' : gHome === rAway ? 'partial' : 'incorrect'
      fb.awayTeam = gAway === rAway ? 'correct' : gAway === rHome ? 'partial' : 'incorrect'
    }
  }

  if (activeFields.includes('year')) {
    const diff = Math.abs(parseInt(guess.year || '0') - match.year)
    fb.year = diff === 0 ? 'correct' : diff <= 2 ? 'partial' : 'incorrect'
  }

  if (activeFields.includes('competition')) {
    const gComp = normalize(guess.competition)
    const rComp = normalize(match.competition)
    fb.competition =
      gComp === rComp ? 'correct'
      : rComp.includes(gComp) || gComp.includes(rComp) ? 'partial'
      : 'incorrect'
  }

  return fb
}

function checkWin(feedback: FieldFeedback, difficulty: Difficulty): boolean {
  return FIELDS_BY_DIFFICULTY[difficulty].every((f) => feedback[f] === 'correct')
}

// ─── localStorage ─────────────────────────────────────────────────────────────

const STATS_KEY = 'puerroxgame_stats'

const DEFAULT_STATS: PlayerStats = {
  totalScore: 0,
  levelsPlayed: 0,
  levelsPerfect: 0,
  unlockedDifficulties: ['easy'],
}

function loadStats(): PlayerStats {
  if (typeof window === 'undefined') return DEFAULT_STATS
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (!raw) return DEFAULT_STATS
    const parsed = JSON.parse(raw)
    // retrocompatibilidad: asegurar que siempre tenga unlockedDifficulties
    if (!parsed.unlockedDifficulties) parsed.unlockedDifficulties = ['easy']
    return parsed
  } catch {
    return DEFAULT_STATS
  }
}

function saveStats(stats: PlayerStats) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

// ─── Estado ───────────────────────────────────────────────────────────────────

const EMPTY_GUESS: GuessFields = { homeTeam: '', awayTeam: '', year: '', competition: '' }

export type GameMode = 'random'
export type GameStatus = 'idle' | 'playing' | 'between_matches' | 'level_done'

interface GameState {
  difficulty:          Difficulty | null
  matchQueue:          Match[]
  currentMatchIndex:   number
  attempts:            Attempt[]
  attemptsLeft:        number
  currentGuess:        GuessFields
  matchResults:        MatchResult[]
  status:              GameStatus
  newlyUnlocked:       Difficulty | null
}

const INITIAL_STATE: GameState = {
  difficulty:        null,
  matchQueue:        [],
  currentMatchIndex: 0,
  attempts:          [],
  attemptsLeft:      0,
  currentGuess:      EMPTY_GUESS,
  matchResults:      [],
  status:            'idle',
  newlyUnlocked:     null,
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const [stats, setStats] = useState<PlayerStats>(DEFAULT_STATS)

  useEffect(() => { setStats(loadStats()) }, [])

  const startGame = useCallback((difficulty: Difficulty, mode: GameMode = 'random') => {
    const queue = getMatchesForLevel(difficulty, true)

    setState({
      difficulty,
      matchQueue:        queue,
      currentMatchIndex: 0,
      attempts:          [],
      attemptsLeft:      MAX_ATTEMPTS[difficulty],
      currentGuess:      EMPTY_GUESS,
      matchResults:      [],
      status:            'playing',
      newlyUnlocked:     null,
    })
  }, [])

  const setGuessField = useCallback((field: keyof GuessFields, value: string) => {
    setState((prev) => ({
      ...prev,
      currentGuess: { ...prev.currentGuess, [field]: value },
    }))
  }, [])

  const submitGuess = useCallback(() => {
    setState((prev) => {
      if (!prev.difficulty || prev.status !== 'playing') return prev

      const match    = prev.matchQueue[prev.currentMatchIndex]
      const feedback = validateGuess(prev.currentGuess, match, prev.difficulty)
      const newAttempts    = [...prev.attempts, { guess: prev.currentGuess, feedback }]
      const won            = checkWin(feedback, prev.difficulty)
      const newAttemptsLeft = prev.attemptsLeft - 1
      const lost           = !won && newAttemptsLeft === 0

      if (won || lost) {
        const earned = won ? calcScore(prev.difficulty, newAttempts.length) : 0
        const result: MatchResult = {
          match,
          won,
          score:        earned,
          attemptsUsed: newAttempts.length,
        }
        return {
          ...prev,
          attempts:     newAttempts,
          attemptsLeft: newAttemptsLeft,
          matchResults: [...prev.matchResults, result],
          status:       'between_matches',
          currentGuess: EMPTY_GUESS,
        }
      }

      return {
        ...prev,
        attempts:     newAttempts,
        attemptsLeft: newAttemptsLeft,
        currentGuess: EMPTY_GUESS,
      }
    })
  }, [])

  // Avanza al siguiente partido o finaliza el nivel
  const nextMatch = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'between_matches' || !prev.difficulty) return prev

      const isLast = prev.currentMatchIndex >= MATCHES_PER_LEVEL - 1

      if (isLast) {
        const levelScore = prev.matchResults.reduce((acc, r) => acc + r.score, 0)
        const winsCount  = prev.matchResults.filter((r) => r.won).length
        const isPerfect  = winsCount === MATCHES_PER_LEVEL
        const current    = loadStats()

        // Desbloquear siguiente dificultad si se alcanzó el umbral
        const currentIdx  = DIFFICULTY_ORDER.indexOf(prev.difficulty!)
        const nextDiff    = DIFFICULTY_ORDER[currentIdx + 1] as Difficulty | undefined
        const shouldUnlock = nextDiff && winsCount >= UNLOCK_THRESHOLD
        const newUnlocked = shouldUnlock && !current.unlockedDifficulties.includes(nextDiff!)
          ? [...current.unlockedDifficulties, nextDiff!]
          : current.unlockedDifficulties

        const updated: PlayerStats = {
          totalScore:            current.totalScore + levelScore,
          levelsPlayed:          current.levelsPlayed + 1,
          levelsPerfect:         current.levelsPerfect + (isPerfect ? 1 : 0),
          unlockedDifficulties:  newUnlocked,
        }
        saveStats(updated)
        setStats(updated)

        return { ...prev, status: 'level_done', newlyUnlocked: nextDiff && newUnlocked.includes(nextDiff!) ? nextDiff : null }
      }

      return {
        ...prev,
        currentMatchIndex: prev.currentMatchIndex + 1,
        attempts:          [],
        attemptsLeft:      MAX_ATTEMPTS[prev.difficulty],
        currentGuess:      EMPTY_GUESS,
        status:            'playing',
      }
    })
  }, [])

  const resetGame = useCallback(() => { setState(INITIAL_STATE) }, [])

  const resetStats = useCallback(() => {
    saveStats(DEFAULT_STATS)
    setStats(DEFAULT_STATS)
  }, [])

  // Computed
  const match = state.matchQueue[state.currentMatchIndex] ?? null

  // Resultado del partido que acaba de terminar (para la pantalla between_matches)
  const lastResult = state.matchResults[state.matchResults.length - 1] ?? null

  return {
    ...state,
    match,
    lastResult,
    stats,
    startGame,
    setGuessField,
    submitGuess,
    nextMatch,
    resetGame,
    resetStats,
  }
}
