export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type FeedbackStatus = 'correct' | 'incorrect' | 'partial' | 'empty'

export interface Match {
  id: string
  difficulty: Difficulty
  homeTeam: string
  awayTeam: string
  date: string        // "YYYY-MM-DD"
  year: number
  competition: string
  score: string       // "2-1"
  scorers: string[]
  neutral?: boolean   // sin local/visitante (finales, mundiales, sede neutral)
}

export interface GuessFields {
  homeTeam: string
  awayTeam: string
  year: string
  competition: string
}

export interface FieldFeedback {
  homeTeam: FeedbackStatus
  awayTeam: FeedbackStatus
  year: FeedbackStatus
  competition: FeedbackStatus
}

export interface Attempt {
  guess: GuessFields
  feedback: FieldFeedback
}

export interface MatchResult {
  match: Match
  won: boolean
  score: number
  attemptsUsed: number
}

export interface PlayerStats {
  totalScore: number
  levelsPlayed: number
  levelsPerfect: number
  unlockedDifficulties: Difficulty[]
}

export const DIFFICULTY_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'expert']

export const UNLOCK_THRESHOLD = 3   // partidos ganados mínimos para desbloquear el siguiente nivel


// Qué pistas se muestran según dificultad
export const CLUES_BY_DIFFICULTY: Record<Difficulty, {
  showYear: boolean
  showCompetition: boolean
  showScore: boolean
  showScorers: boolean
}> = {
  easy:   { showYear: true,  showCompetition: true,  showScore: true, showScorers: true },
  medium: { showYear: false, showCompetition: true,  showScore: true, showScorers: true },
  hard:   { showYear: false, showCompetition: false, showScore: true, showScorers: true },
  expert: { showYear: false, showCompetition: false, showScore: false, showScorers: true },
}

// Qué campos debe completar el usuario según dificultad
export const FIELDS_BY_DIFFICULTY: Record<Difficulty, (keyof GuessFields)[]> = {
  easy:   ['homeTeam', 'awayTeam'],
  medium: ['homeTeam', 'awayTeam', 'year'],
  hard:   ['homeTeam', 'awayTeam', 'year', 'competition'],
  expert: ['homeTeam', 'awayTeam', 'year', 'competition'],
}

export const MAX_ATTEMPTS: Record<Difficulty, number> = {
  easy:   4,
  medium: 3,
  hard:   2,
  expert: 1,
}

export const BASE_SCORE: Record<Difficulty, number> = {
  easy:   100,
  medium: 250,
  hard:   400,
  expert: 600,
}

export const PENALTY_PER_ATTEMPT: Record<Difficulty, number> = {
  easy:   10,
  medium: 35,
  hard:   75,
  expert: 150,
}

export const MATCHES_PER_LEVEL = 5

export function calcScore(difficulty: Difficulty, attemptsUsed: number): number {
  const base = BASE_SCORE[difficulty]
  const penalty = PENALTY_PER_ATTEMPT[difficulty]
  return Math.max(base - (attemptsUsed - 1) * penalty, 0)
}
