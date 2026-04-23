import Image from 'next/image'
import Link from 'next/link'
import GameCardStats from '@/components/home/GameCardStats'
import AboutSheet from '@/components/game/AboutSheet'

const GAMES = [
  {
    href: '/adivina-el-partido',
    title: 'Adiviná el Partido',
    description: 'Adiviná el partido histórico a partir de pistas. Cuatro dificultades, sistema de puntos y rankings.',
    tag: 'Fútbol',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    storageKey: 'puerroxgame_stats',
  },
  {
    href: '/adivina-el-jugador',
    title: 'Adiviná el Jugador',
    description: 'Adiviná el jugador por sus características. Cada intento revela si vas frío o caliente en cada atributo.',
    tag: 'Fútbol',
    tagColor: 'bg-yellow-400/20 text-yellow-300 border-yellow-400/30',
    storageKey: 'adivina-jugador_stats',
    isNew: true,
  },
]

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#020613]">
      <div
        className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #1a4fd6 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, #f5a800 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

      <AboutSheet>
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">¿Qué es PuerroXGames?</h3>
          <p className="text-sm text-white/60 leading-relaxed">
            Una colección de juegos de fútbol hechos por y para DavoXeneize. Cada juego propone un desafío
            distinto: adiviná partidos, jugadores, y más.
          </p>
        </section>

        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">Juegos disponibles</h3>
          <div className="flex flex-col gap-2">
            {[
              { name: 'Adiviná el Partido', desc: 'Identificá el partido histórico a partir de pistas' },
            ].map(({ name, desc }) => (
              <div key={name} className="flex flex-col gap-0.5 py-2 border-b border-white/5 last:border-0">
                <span className="text-sm font-semibold text-white/80">{name}</span>
                <span className="text-xs text-white/30">{desc}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-2 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <p className="text-sm text-white/70 leading-relaxed">
            Más juegos en camino. Mandanos tus ideas y sugerencias. 🚀
          </p>
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

      <main className="relative z-10 flex flex-col items-center min-h-screen px-4 py-16 gap-12">

        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <Image
            src="/PuerroxGameLogo.png"
            alt="PuerroXGames"
            width={400}
            height={400}
            className="rounded-2xl"
            priority
          />
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight">PuerroXGames</h1>
            <p className="text-white/40 text-sm mt-1">Elegí un juego y a jugar</p>
          </div>
        </div>

        {/* Grid de juegos */}
        <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {GAMES.map((game) => (
            <Link
              key={game.href}
              href={game.href}
              className="group relative flex flex-col gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10
                hover:bg-white/[0.07] hover:border-white/20 transition-all duration-200"
            >
              {game.isNew && (
                <span className="absolute -top-2.5 -right-2.5 text-[11px] font-black uppercase tracking-wider
                  px-2.5 py-1 rounded-full bg-green-400 text-white shadow-lg shadow-green-400/40
                  animate-pulse">
                  Nuevo
                </span>
              )}
              <div className="flex items-start justify-between gap-2">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${game.tagColor}`}>
                  {game.tag}
                </span>
                <span className="text-xs text-green-400/70 font-semibold">Disponible</span>
              </div>

              <div>
                <h2 className="text-lg font-black text-white group-hover:text-white/90">{game.title}</h2>
                <p className="text-sm text-white/40 mt-1 leading-relaxed">{game.description}</p>
              </div>

              <div className="mt-auto pt-2 text-sm font-bold text-white/60 group-hover:text-white transition-colors">
                <GameCardStats storageKey={game.storageKey} fallback="Jugar →" />
              </div>
            </Link>
          ))}

        </div>

      </main>
    </div>
  )
}
