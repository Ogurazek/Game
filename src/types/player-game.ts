export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert'

export type Position = 'Portero' | 'Defensor' | 'Mediocampista' | 'Delantero'

export interface Player {
  id: string
  name: string
  nationality: string
  position: Position
  team: string
  league: string
  age: number
  careerGoals: number
  careerAssists: number
  isTarget?: boolean
  targetDifficulty?: Difficulty
}

export type ComparisonResult = 'correct' | 'higher' | 'lower' | 'incorrect'

export interface AttemptFeedback {
  nationality: 'correct' | 'incorrect'
  position: 'correct' | 'incorrect'
  team: 'correct' | 'incorrect'
  league: 'correct' | 'incorrect'
  age: ComparisonResult
  careerGoals: ComparisonResult
  careerAssists: ComparisonResult
}

export interface PlayerAttempt {
  player: Player
  feedback: AttemptFeedback
}

export interface PlayerResult {
  target: Player
  won: boolean
  score: number
  attemptsUsed: number
}

export interface PlayerGameStats {
  totalScore: number
  levelsPlayed: number
  levelsPerfect: number
  unlockedDifficulties: Difficulty[]
}

export const DIFFICULTY_ORDER: Difficulty[] = ['easy', 'medium', 'hard', 'expert']
export const UNLOCK_THRESHOLD = 3
export const PLAYERS_PER_LEVEL = 5

export const MAX_ATTEMPTS: Record<Difficulty, number> = {
  easy:   8,
  medium: 6,
  hard:   4,
  expert: 3,
}

export const MAX_PLAYER_SCORE = 10
export const HINT_PENALTY = 2

export const CLUES_BY_DIFFICULTY: Record<Difficulty, {
  showNationality: boolean
  showPosition:   boolean
  showTeam:       boolean
  showLeague:     boolean
  showAge:        boolean
  showGoals:      boolean
}> = {
  easy:   { showNationality: true,  showPosition: true, showTeam: true,  showLeague: true,  showAge: true,  showGoals: true  },
  medium: { showNationality: true,  showPosition: true, showTeam: false, showLeague: true,  showAge: true,  showGoals: true  },
  hard:   { showNationality: true,  showPosition: true, showTeam: false, showLeague: false, showAge: true,  showGoals: true  },
  expert: { showNationality: true,  showPosition: true, showTeam: false, showLeague: false, showAge: false, showGoals: true  },
}

export function calcScore(_difficulty: Difficulty, attemptsUsed: number, hintsUsed = 0): number {
  return Math.max(MAX_PLAYER_SCORE - (attemptsUsed - 1) - hintsUsed * HINT_PENALTY, 0)
}
