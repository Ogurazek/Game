import { Player } from '@/types/player-game'

// ─── Jugadores objetivo (20) ─────────────────────────────────────────────────

export const TARGET_PLAYERS: Player[] = [
  // EASY (5) — Todos los conocen
  { id: 'lamine',     name: 'Lamine Yamal',       nationality: 'España', position: 'Delantero',      team: 'Barcelona',      league: 'La Liga',               pastTeam: 'Barcelona',           funFact: 'La gente pide que le den la copa amagues',                          careerGoals: 55, careerAssists: 25, isTarget: true, targetDifficulty: 'easy' },
  { id: 'alvarez',   name: 'Julián Álvarez',   nationality: 'Argentina',  position: 'Delantero',      team: 'Manchester City',         league: 'La Liga',  pastTeam: 'Manchester City',          funFact: 'Vacuno a Boca 3 veces',                        careerGoals: 138, careerAssists: 81, isTarget: true, targetDifficulty: 'easy' },
  { id: 'rodriguez',    name: 'James Rodríguez',       nationality: 'Colombia',   position: 'Delantero',      team: 'Minnesota United FC',      league: 'MLS',           pastTeam: 'Minnesota United FC',                  funFact: 'Ganador del Premio Puskás',       careerGoals: 136, careerAssists: 162, isTarget: true, targetDifficulty: 'easy' },
  { id: 'palermo',   name: 'Martín Palermo',      nationality: 'Argentina',   position: 'Delantero',      team: 'Boca Juniors',      league: 'Retirado',           pastTeam: 'Boca',    funFact: 'Gol épico a Perú', careerGoals: 298, careerAssists: 52, isTarget: true, targetDifficulty: 'easy' },
  { id: 'neymar',    name: 'Neymar Jr',            nationality: 'Brasil',    position: 'Delantero',      team: 'Barcelona',           league: 'Brasileirao',       pastTeam: 'Barcelona',            funFact: 'Triple corona con Barcelona',         careerGoals: 440, careerAssists: 258, isTarget: true, targetDifficulty: 'easy' },

  // MEDIUM (5) — Conocidos, requieren algo de fútbol
  { id: 'nicolas',  name: 'Nico Paz',          nationality: 'Argentina',    position: 'Delantero',      team: 'Como',      league: 'Serie A',           pastTeam: 'Como',             funFact: 'Muy parecido de cara a Davo Xeneize 🤡',        careerGoals: 32, careerAssists: 17,  isTarget: true, targetDifficulty: 'medium' },
  { id: 'salah',     name: 'Mohamed Salah',        nationality: 'Egipto',    position: 'Delantero',      team: 'Chelsea',        league: 'Premier League',    pastTeam: 'Chelsea',                 funFact: '4 veces Bota de Oro de la Premier League',  careerGoals: 334, careerAssists: 163, isTarget: true, targetDifficulty: 'medium' },
  { id: 'raphinha',      name: 'Raphinha',   nationality: 'Brasil',   position: 'Delantero',      team: 'Leeds United F. C.',        league: 'La Liga',           pastTeam: 'Leeds United F. C.',        funFact: 'Le tiene miedo al atleti, siempre cuando hay partido se lesiona',     careerGoals: 134, careerAssists: 86, isTarget: true, targetDifficulty: 'medium' },
  { id: 'debruyne',  name: 'Kevin De Bruyne',      nationality: 'Bélgica',   position: 'Mediocampista',  team: 'Manchester City',  league: 'Serie A',    pastTeam: 'Manchester City',        funFact: '6 Premier League con Manchester City',      careerGoals: 196, careerAssists: 311, isTarget: true, targetDifficulty: 'medium' },
  { id: 'modric',    name: 'Luka Modric',          nationality: 'Croacia',   position: 'Mediocampista',  team: 'AC Milan',      league: 'Serie A',           pastTeam: 'AC Milan',    funFact: '4 Champions League',   careerGoals: 107,  careerAssists: 149, isTarget: true, targetDifficulty: 'medium' },

  // HARD (5) — Buen conocimiento de fútbol
  { id: 'saka',       name: 'Bukayo Saka',         nationality: 'Inglaterra', position: 'Delantero',     team: 'Arsenal',          league: 'Premier League',    pastTeam: 'Arsenal',              funFact: 'Hizo toda su carrera profesional en un solo equipo',      careerGoals: 79,  careerAssists: 68,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'vitinha',      name: 'Vitinha',               nationality: 'Portugal',     position: 'Mediocampista', team: 'Porto',        league: 'Ligue 1',           pastTeam: 'Porto',           funFact: 'Tiene una orejona',   careerGoals: 39,  careerAssists: 25,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'palmer',    name: 'Cole Palmer',     nationality: 'Inglaterra', position: 'Delantero',    team: 'Manchester City',        league: 'Premier League',    pastTeam: 'Manchester City',          funFact: 'Come Carne 🧊', careerGoals: 58, careerAssists: 34, isTarget: true, targetDifficulty: 'hard' },
  { id: 'calleri',      name: 'Jonathan Calleri',               nationality: 'Argentina',     position: 'Delantero', team: 'Boca Juniors',  league: 'Serie A de Brasil',    pastTeam: 'Boca Juniors',      funFact: 'Golazo de Rabona', careerGoals: 152,  careerAssists: 51,  isTarget: true, targetDifficulty: 'hard' },
  { id: 'bellingham', name: 'Jude Bellingham',     nationality: 'Inglaterra', position: 'Mediocampista', team: 'Borussia Dortmund',      league: 'La Liga', pastTeam: 'Borussia Dortmund',      funFact: 'Fue el jugador más joven en ser capitán en la historia del Dortmund', careerGoals: 72, careerAssists: 56,  isTarget: true, targetDifficulty: 'hard' },

  // EXPERT (5) — Fútbol de alto nivel
  { id: 'wirtz',      name: 'Florian Wirtz',       nationality: 'Alemania',  position: 'Mediocampista',  team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Bayer Leverkusen',     funFact: 'Debutó en Bundesliga con 17 años', careerGoals: 64, careerAssists: 70, isTarget: true, targetDifficulty: 'expert' },
  { id: 'upamecano',      name: 'Dayot Upamecano',        nationality: 'Francia',    position: 'Delantero',      team: 'Red Bull Salzburgo',        league: 'Bundesliga',           pastTeam: 'Red Bull Salzburgo',            funFact: 'Upa, me duele el 🍑',         careerGoals: 22,  careerAssists: 25,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'rashford', name: 'Marcus Rashford',     nationality: 'Inglaterra',    position: 'Delantero',      team: 'Manchester United',  league: 'La Liga',           pastTeam: 'Manchester United',      funFact: 'Davito lo defiende como si fuera Messi',          careerGoals: 155,  careerAssists: 76,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'kvara',      name: 'Khvicha Kvaratskhelia', nationality: 'Georgia', position: 'Delantero',      team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Napoli',               funFact: 'Fue clave en el título de liga de un club italiano tras más de 30 años',    careerGoals: 76,  careerAssists: 56,  isTarget: true, targetDifficulty: 'expert' },
  { id: 'gavi',       name: 'Gavi',                nationality: 'España',    position: 'Mediocampista',  team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Barcelona',            funFact: 'Campeón de una Eurocopa muy joven',         careerGoals: 10,  careerAssists: 16,  isTarget: true, targetDifficulty: 'expert' },
]

// ─── Pool de autocompletado (jugadores adicionales) ───────────────────────────

const POOL_PLAYERS: Player[] = [
  // Delanteros
  { id: 'kane',        name: 'Harry Kane',          nationality: 'Inglaterra',  position: 'Delantero',     team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Tottenham Hotspur',    careerGoals: 350, careerAssists: 105 },
  { id: 'griezmann',   name: 'Antoine Griezmann',   nationality: 'Francia',     position: 'Delantero',     team: 'Atlético Madrid',  league: 'La Liga',           pastTeam: 'Real Sociedad', careerGoals: 200, careerAssists: 120 },
  { id: 'benzema',     name: 'Karim Benzema',       nationality: 'Francia',     position: 'Delantero',     team: 'Al Ittihad',       league: 'Saudi Pro League',  pastTeam: 'Real Madrid', careerGoals: 400, careerAssists: 175 },
  { id: 'dybala',      name: 'Paulo Dybala',        nationality: 'Argentina',   position: 'Delantero',     team: 'Roma',             league: 'Serie A',           pastTeam: 'Juventus', careerGoals: 150, careerAssists: 90  },
  { id: 'lautaro',     name: 'Lautaro Martínez',    nationality: 'Argentina',   position: 'Delantero',     team: 'Inter Milan',      league: 'Serie A',           pastTeam: 'Racing Club', careerGoals: 150, careerAssists: 55  },
  { id: 'rashford',    name: 'Marcus Rashford',     nationality: 'Inglaterra',  position: 'Delantero',     team: 'Aston Villa',      league: 'Premier League',    pastTeam: 'Manchester United', careerGoals: 110, careerAssists: 62  },
  { id: 'foden',       name: 'Phil Foden',          nationality: 'Inglaterra',  position: 'Delantero',     team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Manchester City', careerGoals: 80,  careerAssists: 58  },
  { id: 'martinelli',  name: 'Gabriel Martinelli',  nationality: 'Brasil',      position: 'Delantero',     team: 'Arsenal',          league: 'Premier League',    pastTeam: 'Ituano', careerGoals: 62,  careerAssists: 35  },
  { id: 'nunez',       name: 'Darwin Núñez',        nationality: 'Uruguay',     position: 'Delantero',     team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Benfica', careerGoals: 70,  careerAssists: 25  },
  { id: 'watkins',     name: 'Ollie Watkins',       nationality: 'Inglaterra',  position: 'Delantero',     team: 'Aston Villa',      league: 'Premier League',    pastTeam: 'Brentford', careerGoals: 100, careerAssists: 45  },
  { id: 'osimhen',     name: 'Victor Osimhen',      nationality: 'Nigeria',     position: 'Delantero',     team: 'Galatasaray',      league: 'Süper Lig',         pastTeam: 'Napoli', careerGoals: 110, careerAssists: 25  },
  { id: 'dembele',     name: 'Ousmane Dembélé',     nationality: 'Francia',     position: 'Delantero',     team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Barcelona', careerGoals: 80,  careerAssists: 90  },
  { id: 'mthuram',     name: 'Marcus Thuram',       nationality: 'Francia',     position: 'Delantero',     team: 'Inter Milan',      league: 'Serie A',           pastTeam: 'B. Mönchengladbach', careerGoals: 80,  careerAssists: 35  },
  { id: 'raphinha',    name: 'Raphinha',             nationality: 'Brasil',      position: 'Delantero',     team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Leeds United', careerGoals: 95,  careerAssists: 65  },
  { id: 'olmo',        name: 'Dani Olmo',           nationality: 'España',      position: 'Delantero',     team: 'Barcelona',        league: 'La Liga',           pastTeam: 'RB Leipzig', careerGoals: 60,  careerAssists: 40  },
  { id: 'lookman',     name: 'Ademola Lookman',     nationality: 'Nigeria',     position: 'Delantero',     team: 'Atalanta',         league: 'Serie A',           pastTeam: 'Everton', careerGoals: 62,  careerAssists: 35  },
  { id: 'retegui',     name: 'Mateo Retegui',       nationality: 'Italia',      position: 'Delantero',     team: 'Atalanta',         league: 'Serie A',           pastTeam: 'Genoa', careerGoals: 55,  careerAssists: 18  },
  { id: 'ansufati',    name: 'Ansu Fati',           nationality: 'España',      position: 'Delantero',     team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Barcelona', careerGoals: 28,  careerAssists: 15  },

  // Mediocampistas
  { id: 'brunofernandes', name: 'Bruno Fernandes',  nationality: 'Portugal',    position: 'Mediocampista', team: 'Manchester United', league: 'Premier League',   pastTeam: 'Sporting CP', careerGoals: 120, careerAssists: 125 },
  { id: 'kimmich',     name: 'Joshua Kimmich',      nationality: 'Alemania',    position: 'Mediocampista', team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'RB Leipzig', careerGoals: 60,  careerAssists: 120 },
  { id: 'sane',        name: 'Leroy Sané',          nationality: 'Alemania',    position: 'Delantero',     team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Manchester City', careerGoals: 100, careerAssists: 115 },
  { id: 'gundogan',    name: 'Ilkay Gündogan',      nationality: 'Alemania',    position: 'Mediocampista', team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Borussia Dortmund', careerGoals: 80,  careerAssists: 85  },
  { id: 'declanrice',  name: 'Declan Rice',         nationality: 'Inglaterra',  position: 'Mediocampista', team: 'Arsenal',          league: 'Premier League',    pastTeam: 'West Ham United', careerGoals: 40,  careerAssists: 28  },
  { id: 'odegaard',    name: 'Martin Ødegaard',     nationality: 'Noruega',     position: 'Mediocampista', team: 'Arsenal',          league: 'Premier League',    pastTeam: 'Real Sociedad', careerGoals: 65,  careerAssists: 58  },
  { id: 'dejong',      name: 'Frenkie de Jong',     nationality: 'Países Bajos', position: 'Mediocampista', team: 'Barcelona',       league: 'La Liga',           pastTeam: 'Ajax', careerGoals: 30,  careerAssists: 42  },
  { id: 'musiala',     name: 'Jamal Musiala',       nationality: 'Alemania',    position: 'Mediocampista', team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Bayern Munich', careerGoals: 42,  careerAssists: 50  },
  { id: 'camavinga',   name: 'Eduardo Camavinga',   nationality: 'Francia',     position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Stade Rennais', careerGoals: 18,  careerAssists: 25  },
  { id: 'tchouameni',  name: 'Aurélien Tchouaméni', nationality: 'Francia',     position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'AS Monaco', careerGoals: 20,  careerAssists: 15  },
  { id: 'valverde',    name: 'Federico Valverde',   nationality: 'Uruguay',     position: 'Mediocampista', team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Peñarol', careerGoals: 38,  careerAssists: 45  },
  { id: 'kroos',       name: 'Toni Kroos',          nationality: 'Alemania',    position: 'Mediocampista', team: 'Retirado',         league: '-',                 pastTeam: 'Bayern Munich', careerGoals: 90,  careerAssists: 185 },

  // Defensores
  { id: 'taa',         name: 'Trent Alexander-Arnold', nationality: 'Inglaterra', position: 'Defensor',    team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Liverpool', careerGoals: 25,  careerAssists: 82  },
  { id: 'robertson',   name: 'Andy Robertson',      nationality: 'Escocia',     position: 'Defensor',      team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Hull City', careerGoals: 15,  careerAssists: 72  },
  { id: 'rubendias',   name: 'Rúben Dias',          nationality: 'Portugal',    position: 'Defensor',      team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Benfica', careerGoals: 12,  careerAssists: 10  },
  { id: 'kounde',      name: 'Jules Koundé',        nationality: 'Francia',     position: 'Defensor',      team: 'Barcelona',        league: 'La Liga',           pastTeam: 'Sevilla', careerGoals: 12,  careerAssists: 18  },
  { id: 'marquinhos',  name: 'Marquinhos',          nationality: 'Brasil',      position: 'Defensor',      team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Roma', careerGoals: 35,  careerAssists: 20  },
  { id: 'hakimi',      name: 'Achraf Hakimi',       nationality: 'Marruecos',   position: 'Defensor',      team: 'PSG',              league: 'Ligue 1',           pastTeam: 'Inter Milan', careerGoals: 40,  careerAssists: 75  },
  { id: 'theohernandez', name: 'Theo Hernández',    nationality: 'Francia',     position: 'Defensor',      team: 'AC Milan',         league: 'Serie A',           pastTeam: 'Real Sociedad', careerGoals: 35,  careerAssists: 65  },
  { id: 'rudiger',     name: 'Antonio Rüdiger',     nationality: 'Alemania',    position: 'Defensor',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'AS Roma', careerGoals: 20,  careerAssists: 10  },
  { id: 'militao',     name: 'Éder Militão',        nationality: 'Brasil',      position: 'Defensor',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'FC Porto', careerGoals: 10,  careerAssists: 8   },
  { id: 'laporte',     name: 'Aymeric Laporte',     nationality: 'España',      position: 'Defensor',      team: 'Al Nassr',         league: 'Saudi Pro League',  pastTeam: 'Manchester City', careerGoals: 18,  careerAssists: 15  },
  { id: 'upamecano',   name: 'Dayot Upamecano',     nationality: 'Francia',     position: 'Defensor',      team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'RB Leipzig', careerGoals: 8,   careerAssists: 5   },
  { id: 'alaba',       name: 'David Alaba',         nationality: 'Austria',     position: 'Defensor',      team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Bayern Munich', careerGoals: 32,  careerAssists: 75  },

  // Porteros
  { id: 'alisson',     name: 'Alisson Becker',      nationality: 'Brasil',      position: 'Portero',       team: 'Liverpool',        league: 'Premier League',    pastTeam: 'Roma', careerGoals: 3,   careerAssists: 2   },
  { id: 'ederson',     name: 'Ederson',             nationality: 'Brasil',      position: 'Portero',       team: 'Manchester City',  league: 'Premier League',    pastTeam: 'Benfica', careerGoals: 0,   careerAssists: 0   },
  { id: 'neuer',       name: 'Manuel Neuer',        nationality: 'Alemania',    position: 'Portero',       team: 'Bayern Munich',    league: 'Bundesliga',        pastTeam: 'Schalke 04', careerGoals: 2,   careerAssists: 5   },
  { id: 'oblak',       name: 'Jan Oblak',           nationality: 'Eslovenia',   position: 'Portero',       team: 'Atlético Madrid',  league: 'La Liga',           pastTeam: 'Benfica', careerGoals: 0,   careerAssists: 1   },
  { id: 'terstegen',   name: 'Marc-André ter Stegen', nationality: 'Alemania',  position: 'Portero',       team: 'Barcelona',        league: 'La Liga',           pastTeam: 'B. Mönchengladbach', careerGoals: 1,   careerAssists: 2   },
  { id: 'courtois',    name: 'Thibaut Courtois',    nationality: 'Bélgica',     position: 'Portero',       team: 'Real Madrid',      league: 'La Liga',           pastTeam: 'Atlético Madrid', careerGoals: 0,   careerAssists: 1   },
]

// ─── Lista completa para autocompletado ──────────────────────────────────────

export const ALL_PLAYERS: Player[] = [...TARGET_PLAYERS, ...POOL_PLAYERS]
  .filter((p, i, arr) => arr.findIndex((q) => q.name === p.name) === i)

export function getTargetsForDifficulty(difficulty: import('@/types/player-game').Difficulty): Player[] {
  return TARGET_PLAYERS.filter((p) => p.targetDifficulty === difficulty)
}

export function getShuffledTargets(difficulty: import('@/types/player-game').Difficulty): Player[] {
  const targets = getTargetsForDifficulty(difficulty)
  return [...targets].sort(() => Math.random() - 0.5)
}
