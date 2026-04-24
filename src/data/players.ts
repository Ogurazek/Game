import { Player } from '@/types/player-game'

// ─── Jugadores objetivo (20) ─────────────────────────────────────────────────

export const TARGET_PLAYERS: Player[] = [
  // EASY (5) — Todos los conocen
  { id: 'messi',     name: 'Lionel Messi',       nationality: 'Argentina', position: 'Delantero',      team: 'Inter Miami',      league: 'MLS',               pastTeam: 'Barcelona',           age: 37, careerGoals: 853, careerAssists: 380, isTarget: true, targetDifficulty: 'easy' },
  { id: 'ronaldo',   name: 'Cristiano Ronaldo',   nationality: 'Portugal',  position: 'Delantero',      team: 'Al Nassr',         league: 'Saudi Pro League',  pastTeam: 'Real Madrid',          age: 40, careerGoals: 906, careerAssists: 235, isTarget: true, targetDifficulty: 'easy' },
  { id: 'mbappe',    name: 'Kylian Mbappé',       nationality: 'Francia',   position: 'Delantero',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'PSG',                  age: 26, careerGoals: 280, careerAssists: 150, isTarget: true, targetDifficulty: 'easy' },
  { id: 'haaland',   name: 'Erling Haaland',      nationality: 'Noruega',   position: 'Delantero',      team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Borussia Dortmund',    age: 24, careerGoals: 215, careerAssists: 55,  isTarget: true, targetDifficulty: 'easy' },
  { id: 'neymar',    name: 'Neymar Jr',            nationality: 'Brasil',    position: 'Delantero',      team: 'Santos',           league: 'Brasileirao',       pastTeam: 'Barcelona',            age: 33, careerGoals: 440, careerAssists: 215, isTarget: true, targetDifficulty: 'easy' },

  // MEDIUM (5) — Conocidos, requieren algo de fútbol
  { id: 'vinicius',  name: 'Vinicius Jr',          nationality: 'Brasil',    position: 'Delantero',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Flamengo',             age: 24, careerGoals: 108, careerAssists: 80,  isTarget: true, targetDifficulty: 'medium' },
  { id: 'salah',     name: 'Mohamed Salah',        nationality: 'Egipto',    position: 'Delantero',      team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Roma',                 age: 32, careerGoals: 322, careerAssists: 175, isTarget: true, targetDifficulty: 'medium' },
  { id: 'lewy',      name: 'Robert Lewandowski',   nationality: 'Polonia',   position: 'Delantero',      team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Bayern Munich',        age: 36, careerGoals: 635, careerAssists: 185, isTarget: true, targetDifficulty: 'medium' },
  { id: 'debruyne',  name: 'Kevin De Bruyne',      nationality: 'Bélgica',   position: 'Mediocampista',  team: 'Manchester City',  league: 'Premier League',    pastTeam: 'VfL Wolfsburg',        age: 33, careerGoals: 105, careerAssists: 205, isTarget: true, targetDifficulty: 'medium' },
  { id: 'modric',    name: 'Luka Modric',          nationality: 'Croacia',   position: 'Mediocampista',  team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Tottenham Hotspur',    age: 39, careerGoals: 60,  careerAssists: 150, isTarget: true, targetDifficulty: 'medium' },

  // HARD (5) — Buen conocimiento de fútbol
  { id: 'saka',       name: 'Bukayo Saka',         nationality: 'Inglaterra', position: 'Delantero',     team: 'Arsenal',          league: 'Premier League',    pastTeam: 'Arsenal',              age: 23, careerGoals: 68,  careerAssists: 70,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'pedri',      name: 'Pedri',               nationality: 'España',     position: 'Mediocampista', team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Las Palmas',           age: 22, careerGoals: 22,  careerAssists: 38,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'vandijk',    name: 'Virgil van Dijk',     nationality: 'Países Bajos', position: 'Defensor',    team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Southampton',          age: 33, careerGoals: 52,  careerAssists: 28,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'rodri',      name: 'Rodri',               nationality: 'España',     position: 'Mediocampista', team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Atlético Madrid',      age: 28, careerGoals: 32,  careerAssists: 48,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'bellingham', name: 'Jude Bellingham',     nationality: 'Inglaterra', position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Birmingham City',      age: 21, careerGoals: 48,  careerAssists: 45,  isTarget: true, targetDifficulty: 'hard' },

  // EXPERT (5) — Fútbol de alto nivel
  { id: 'wirtz',      name: 'Florian Wirtz',       nationality: 'Alemania',  position: 'Mediocampista',  team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Bayer Leverkusen',     age: 22, careerGoals: 42,  careerAssists: 58,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'yamal',      name: 'Lamine Yamal',        nationality: 'España',    position: 'Delantero',      team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Barcelona',            age: 17, careerGoals: 22,  careerAssists: 25,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'nicowilliams', name: 'Nico Williams',     nationality: 'España',    position: 'Delantero',      team: 'Athletic Bilbao',  league: 'La Liga',           pastTeam: 'Athletic Bilbao',      age: 22, careerGoals: 32,  careerAssists: 30,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'kvara',      name: 'Khvicha Kvaratskhelia', nationality: 'Georgia', position: 'Delantero',      team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Napoli',               age: 24, careerGoals: 52,  careerAssists: 38,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'gavi',       name: 'Gavi',                nationality: 'España',    position: 'Mediocampista',  team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Barcelona',            age: 20, careerGoals: 14,  careerAssists: 28,  isTarget: true, targetDifficulty: 'expert' },
]

// ─── Pool de autocompletado (jugadores adicionales) ───────────────────────────

const POOL_PLAYERS: Player[] = [
  // Delanteros
  { id: 'kane',        name: 'Harry Kane',          nationality: 'Inglaterra',  position: 'Delantero',     team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Tottenham Hotspur',    age: 31, careerGoals: 350, careerAssists: 105 },
  { id: 'griezmann',   name: 'Antoine Griezmann',   nationality: 'Francia',     position: 'Delantero',     team: 'Atlético Madrid',  league: 'La Liga',           pastTeam: 'Real Sociedad',        age: 33, careerGoals: 200, careerAssists: 120 },
  { id: 'benzema',     name: 'Karim Benzema',       nationality: 'Francia',     position: 'Delantero',     team: 'Al Ittihad',       league: 'Saudi Pro League',  pastTeam: 'Real Madrid',          age: 37, careerGoals: 400, careerAssists: 175 },
  { id: 'dybala',      name: 'Paulo Dybala',        nationality: 'Argentina',   position: 'Delantero',     team: 'Roma',             league: 'Serie A',           pastTeam: 'Juventus',             age: 31, careerGoals: 150, careerAssists: 90  },
  { id: 'lautaro',     name: 'Lautaro Martínez',    nationality: 'Argentina',   position: 'Delantero',     team: 'Inter Milan',      league: 'Serie A',           pastTeam: 'Racing Club',          age: 27, careerGoals: 150, careerAssists: 55  },
  { id: 'rashford',    name: 'Marcus Rashford',     nationality: 'Inglaterra',  position: 'Delantero',     team: 'Aston Villa',      league: 'Premier League',    pastTeam: 'Manchester United',    age: 27, careerGoals: 110, careerAssists: 62  },
  { id: 'foden',       name: 'Phil Foden',          nationality: 'Inglaterra',  position: 'Delantero',     team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Manchester City',      age: 25, careerGoals: 80,  careerAssists: 58  },
  { id: 'martinelli',  name: 'Gabriel Martinelli',  nationality: 'Brasil',      position: 'Delantero',     team: 'Arsenal',          league: 'Premier League',    pastTeam: 'Ituano',               age: 23, careerGoals: 62,  careerAssists: 35  },
  { id: 'nunez',       name: 'Darwin Núñez',        nationality: 'Uruguay',     position: 'Delantero',     team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Benfica',              age: 25, careerGoals: 70,  careerAssists: 25  },
  { id: 'watkins',     name: 'Ollie Watkins',       nationality: 'Inglaterra',  position: 'Delantero',     team: 'Aston Villa',      league: 'Premier League',    pastTeam: 'Brentford',            age: 29, careerGoals: 100, careerAssists: 45  },
  { id: 'osimhen',     name: 'Victor Osimhen',      nationality: 'Nigeria',     position: 'Delantero',     team: 'Galatasaray',      league: 'Süper Lig',         pastTeam: 'Napoli',               age: 26, careerGoals: 110, careerAssists: 25  },
  { id: 'dembele',     name: 'Ousmane Dembélé',     nationality: 'Francia',     position: 'Delantero',     team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Barcelona',            age: 27, careerGoals: 80,  careerAssists: 90  },
  { id: 'mthuram',     name: 'Marcus Thuram',       nationality: 'Francia',     position: 'Delantero',     team: 'Inter Milan',      league: 'Serie A',           pastTeam: 'B. Mönchengladbach',  age: 27, careerGoals: 80,  careerAssists: 35  },
  { id: 'raphinha',    name: 'Raphinha',             nationality: 'Brasil',      position: 'Delantero',     team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Leeds United',         age: 28, careerGoals: 95,  careerAssists: 65  },
  { id: 'olmo',        name: 'Dani Olmo',           nationality: 'España',      position: 'Delantero',     team: 'Barcelona',        league: 'La Liga',           pastTeam: 'RB Leipzig',           age: 26, careerGoals: 60,  careerAssists: 40  },
  { id: 'lookman',     name: 'Ademola Lookman',     nationality: 'Nigeria',     position: 'Delantero',     team: 'Atalanta',         league: 'Serie A',           pastTeam: 'Everton',              age: 27, careerGoals: 62,  careerAssists: 35  },
  { id: 'retegui',     name: 'Mateo Retegui',       nationality: 'Italia',      position: 'Delantero',     team: 'Atalanta',         league: 'Serie A',           pastTeam: 'Genoa',                age: 25, careerGoals: 55,  careerAssists: 18  },
  { id: 'ansufati',    name: 'Ansu Fati',           nationality: 'España',      position: 'Delantero',     team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Barcelona',            age: 22, careerGoals: 28,  careerAssists: 15  },

  // Mediocampistas
  { id: 'brunofernandes', name: 'Bruno Fernandes',  nationality: 'Portugal',    position: 'Mediocampista', team: 'Manchester United', league: 'Premier League',   pastTeam: 'Sporting CP',          age: 30, careerGoals: 120, careerAssists: 125 },
  { id: 'kimmich',     name: 'Joshua Kimmich',      nationality: 'Alemania',    position: 'Mediocampista', team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'RB Leipzig',           age: 30, careerGoals: 60,  careerAssists: 120 },
  { id: 'sane',        name: 'Leroy Sané',          nationality: 'Alemania',    position: 'Delantero',     team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Manchester City',      age: 29, careerGoals: 100, careerAssists: 115 },
  { id: 'gundogan',    name: 'Ilkay Gündogan',      nationality: 'Alemania',    position: 'Mediocampista', team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Borussia Dortmund',    age: 34, careerGoals: 80,  careerAssists: 85  },
  { id: 'declanrice',  name: 'Declan Rice',         nationality: 'Inglaterra',  position: 'Mediocampista', team: 'Arsenal',          league: 'Premier League',    pastTeam: 'West Ham United',      age: 26, careerGoals: 40,  careerAssists: 28  },
  { id: 'odegaard',    name: 'Martin Ødegaard',     nationality: 'Noruega',     position: 'Mediocampista', team: 'Arsenal',          league: 'Premier League',    pastTeam: 'Real Sociedad',        age: 26, careerGoals: 65,  careerAssists: 58  },
  { id: 'dejong',      name: 'Frenkie de Jong',     nationality: 'Países Bajos', position: 'Mediocampista', team: 'Barcelona',       league: 'La Liga',           pastTeam: 'Ajax',                 age: 27, careerGoals: 30,  careerAssists: 42  },
  { id: 'musiala',     name: 'Jamal Musiala',       nationality: 'Alemania',    position: 'Mediocampista', team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Bayern Munich',        age: 22, careerGoals: 42,  careerAssists: 50  },
  { id: 'camavinga',   name: 'Eduardo Camavinga',   nationality: 'Francia',     position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Stade Rennais',        age: 22, careerGoals: 18,  careerAssists: 25  },
  { id: 'tchouameni',  name: 'Aurélien Tchouaméni', nationality: 'Francia',     position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'AS Monaco',            age: 25, careerGoals: 20,  careerAssists: 15  },
  { id: 'valverde',    name: 'Federico Valverde',   nationality: 'Uruguay',     position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Peñarol',              age: 26, careerGoals: 38,  careerAssists: 45  },
  { id: 'kroos',       name: 'Toni Kroos',          nationality: 'Alemania',    position: 'Mediocampista', team: 'Retirado',         league: '-',                 pastTeam: 'Bayern Munich',        age: 35, careerGoals: 90,  careerAssists: 185 },

  // Defensores
  { id: 'taa',         name: 'Trent Alexander-Arnold', nationality: 'Inglaterra', position: 'Defensor',    team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Liverpool',            age: 26, careerGoals: 25,  careerAssists: 82  },
  { id: 'robertson',   name: 'Andy Robertson',      nationality: 'Escocia',     position: 'Defensor',      team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Hull City',            age: 31, careerGoals: 15,  careerAssists: 72  },
  { id: 'rubendias',   name: 'Rúben Dias',          nationality: 'Portugal',    position: 'Defensor',      team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Benfica',              age: 28, careerGoals: 12,  careerAssists: 10  },
  { id: 'kounde',      name: 'Jules Koundé',        nationality: 'Francia',     position: 'Defensor',      team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Sevilla',              age: 26, careerGoals: 12,  careerAssists: 18  },
  { id: 'marquinhos',  name: 'Marquinhos',          nationality: 'Brasil',      position: 'Defensor',      team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Roma',                 age: 31, careerGoals: 35,  careerAssists: 20  },
  { id: 'hakimi',      name: 'Achraf Hakimi',       nationality: 'Marruecos',   position: 'Defensor',      team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Inter Milan',          age: 26, careerGoals: 40,  careerAssists: 75  },
  { id: 'theohernandez', name: 'Theo Hernández',    nationality: 'Francia',     position: 'Defensor',      team: 'AC Milan',         league: 'Serie A',           pastTeam: 'Real Sociedad',        age: 27, careerGoals: 35,  careerAssists: 65  },
  { id: 'rudiger',     name: 'Antonio Rüdiger',     nationality: 'Alemania',    position: 'Defensor',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'AS Roma',              age: 32, careerGoals: 20,  careerAssists: 10  },
  { id: 'militao',     name: 'Éder Militão',        nationality: 'Brasil',      position: 'Defensor',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'FC Porto',             age: 27, careerGoals: 10,  careerAssists: 8   },
  { id: 'laporte',     name: 'Aymeric Laporte',     nationality: 'España',      position: 'Defensor',      team: 'Al Nassr',         league: 'Saudi Pro League',  pastTeam: 'Manchester City',      age: 31, careerGoals: 18,  careerAssists: 15  },
  { id: 'upamecano',   name: 'Dayot Upamecano',     nationality: 'Francia',     position: 'Defensor',      team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'RB Leipzig',           age: 26, careerGoals: 8,   careerAssists: 5   },
  { id: 'alaba',       name: 'David Alaba',         nationality: 'Austria',     position: 'Defensor',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Bayern Munich',        age: 33, careerGoals: 32,  careerAssists: 75  },

  // Porteros
  { id: 'alisson',     name: 'Alisson Becker',      nationality: 'Brasil',      position: 'Portero',       team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Roma',                 age: 32, careerGoals: 3,   careerAssists: 2   },
  { id: 'ederson',     name: 'Ederson',             nationality: 'Brasil',      position: 'Portero',       team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Benfica',              age: 31, careerGoals: 0,   careerAssists: 0   },
  { id: 'neuer',       name: 'Manuel Neuer',        nationality: 'Alemania',    position: 'Portero',       team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Schalke 04',           age: 39, careerGoals: 2,   careerAssists: 5   },
  { id: 'oblak',       name: 'Jan Oblak',           nationality: 'Eslovenia',   position: 'Portero',       team: 'Atlético Madrid',  league: 'La Liga',           pastTeam: 'Benfica',              age: 32, careerGoals: 0,   careerAssists: 1   },
  { id: 'terstegen',   name: 'Marc-André ter Stegen', nationality: 'Alemania',  position: 'Portero',       team: 'Barcelona',        league: 'La Liga',           pastTeam: 'B. Mönchengladbach',  age: 33, careerGoals: 1,   careerAssists: 2   },
  { id: 'courtois',    name: 'Thibaut Courtois',    nationality: 'Bélgica',     position: 'Portero',       team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Atlético Madrid',      age: 33, careerGoals: 0,   careerAssists: 1   },
]

// ─── Lista completa para autocompletado ──────────────────────────────────────

export const ALL_PLAYERS: Player[] = [...TARGET_PLAYERS, ...POOL_PLAYERS]

export function getTargetsForDifficulty(difficulty: import('@/types/player-game').Difficulty): Player[] {
  return TARGET_PLAYERS.filter((p) => p.targetDifficulty === difficulty)
}

export function getShuffledTargets(difficulty: import('@/types/player-game').Difficulty): Player[] {
  const targets = getTargetsForDifficulty(difficulty)
  return [...targets].sort(() => Math.random() - 0.5)
}
