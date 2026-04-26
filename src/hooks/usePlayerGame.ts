'use client'

import { useState, useCallback, useEffect } from 'react'
import {
  Difficulty,
  Player,
  PlayerAttempt,
  PlayerResult,
  PlayerGameStats,
  DIFFICULTY_ORDER,
  PLAYERS_PER_LEVEL,
  MAX_ATTEMPTS,
  UNLOCK_THRESHOLD,
  calcScore,
} from '@/types/player-game'
import { getShuffledTargets } from '@/data/players'

// ─── localStorage ─────────────────────────────────────────────────────────────

const STATS_KEY = 'adivina-jugador_stats'

const DEFAULT_STATS: PlayerGameStats = {
  totalScore: 0,
  levelsPlayed: 0,
  levelsPerfect: 0,
  unlockedDifficulties: ['easy'],
}

function loadStats(): PlayerGameStats {
  if (typeof window === 'undefined') return DEFAULT_STATS
  try {
    const raw = localStorage.getItem(STATS_KEY)
    if (!raw) return DEFAULT_STATS
    const parsed = JSON.parse(raw) as PlayerGameStats
    if (!parsed.unlockedDifficulties) parsed.unlockedDifficulties = ['easy']
    return parsed
  } catch {
    return DEFAULT_STATS
  }
}

function saveStats(stats: PlayerGameStats) {
  if (typeof window === 'undefined') return
  localStorage.setItem(STATS_KEY, JSON.stringify(stats))
}

// ─── Estado ───────────────────────────────────────────────────────────────────

export type PlayerGameStatus = 'idle' | 'playing' | 'between_players' | 'level_done'

interface GameState {
  difficulty:         Difficulty | null
  playerQueue:        Player[]
  currentPlayerIndex: number
  attempts:           PlayerAttempt[]
  attemptsLeft:       number
  playerResults:      PlayerResult[]
  status:             PlayerGameStatus
  newlyUnlocked:      Difficulty | null
  hintsRevealed:      string[]
}

const INITIAL_STATE: GameState = {
  difficulty:         null,
  playerQueue:        [],
  currentPlayerIndex: 0,
  attempts:           [],
  attemptsLeft:       0,
  playerResults:      [],
  status:             'idle',
  newlyUnlocked:      null,
  hintsRevealed:      [],
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePlayerGame() {
  const [state, setState] = useState<GameState>(INITIAL_STATE)
  const [stats, setStats] = useState<PlayerGameStats>(DEFAULT_STATS)

  useEffect(() => { setStats(loadStats()) }, [])

  const startGame = useCallback((difficulty: Difficulty) => {
    const queue = getShuffledTargets(difficulty)
    setState({
      difficulty,
      playerQueue:        queue,
      currentPlayerIndex: 0,
      attempts:           [],
      attemptsLeft:       MAX_ATTEMPTS[difficulty],
      playerResults:      [],
      status:             'playing',
      newlyUnlocked:      null,
      hintsRevealed:      [],
    })
  }, [])

  const submitGuess = useCallback((guessedPlayer: Player) => {
    setState((prev) => {
      if (!prev.difficulty || prev.status !== 'playing') return prev

      const target   = prev.playerQueue[prev.currentPlayerIndex]
      const won      = guessedPlayer.id === target.id
      const newAttempts     = [...prev.attempts, { player: guessedPlayer, isCorrect: won }]
      const newAttemptsLeft = prev.attemptsLeft - 1
      const lost     = !won && newAttemptsLeft === 0

      if (won || lost) {
        const result: PlayerResult = {
          target,
          won,
          score:        won ? calcScore(prev.difficulty, newAttempts.length, prev.hintsRevealed.length) : 0,
          attemptsUsed: newAttempts.length,
        }
        return {
          ...prev,
          attempts:      newAttempts,
          attemptsLeft:  newAttemptsLeft,
          playerResults: [...prev.playerResults, result],
          status:        'between_players',
        }
      }

      return { ...prev, attempts: newAttempts, attemptsLeft: newAttemptsLeft }
    })
  }, [])

  const nextPlayer = useCallback(() => {
    setState((prev) => {
      if (prev.status !== 'between_players' || !prev.difficulty) return prev

      const isLast = prev.currentPlayerIndex >= PLAYERS_PER_LEVEL - 1

      if (isLast) {
        const levelScore  = prev.playerResults.reduce((acc, r) => acc + r.score, 0)
        const winsCount   = prev.playerResults.filter((r) => r.won).length
        const isPerfect   = winsCount === PLAYERS_PER_LEVEL
        const current     = loadStats()

        const currentIdx   = DIFFICULTY_ORDER.indexOf(prev.difficulty)
        const nextDiff     = DIFFICULTY_ORDER[currentIdx + 1] as Difficulty | undefined
        const shouldUnlock = nextDiff && winsCount >= UNLOCK_THRESHOLD
        const newUnlocked  = shouldUnlock && !current.unlockedDifficulties.includes(nextDiff)
          ? [...current.unlockedDifficulties, nextDiff]
          : current.unlockedDifficulties

        const updated: PlayerGameStats = {
          totalScore:           current.totalScore + levelScore,
          levelsPlayed:         current.levelsPlayed + 1,
          levelsPerfect:        current.levelsPerfect + (isPerfect ? 1 : 0),
          unlockedDifficulties: newUnlocked,
        }
        saveStats(updated)
        setStats(updated)

        return {
          ...prev,
          status:        'level_done',
          newlyUnlocked: nextDiff && newUnlocked.includes(nextDiff) ? nextDiff : null,
        }
      }

      return {
        ...prev,
        currentPlayerIndex: prev.currentPlayerIndex + 1,
        attempts:           [],
        attemptsLeft:       MAX_ATTEMPTS[prev.difficulty],
        hintsRevealed:      [],
        status:             'playing',
      }
    })
  }, [])

  const useHint = useCallback((attr: string) => {
    setState((prev) => {
      if (prev.status !== 'playing' || prev.hintsRevealed.includes(attr)) return prev
      return { ...prev, hintsRevealed: [...prev.hintsRevealed, attr] }
    })
  }, [])

  const resetGame = useCallback(() => setState(INITIAL_STATE), [])

  const currentTarget = state.playerQueue[state.currentPlayerIndex] ?? null
  const lastResult    = state.playerResults[state.playerResults.length - 1] ?? null

  return {
    ...state,
    currentTarget,
    lastResult,
    stats,
    startGame,
    submitGuess,
    nextPlayer,
    useHint,
    resetGame,
  }
}
