import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { PlayerStats } from '@/types/game'

interface Props {
  stats: PlayerStats
}

export default function AboutSheet({ stats }: Props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="fixed top-4 right-4 z-30 p-2.5 rounded-xl bg-white/5 border border-white/10
            text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>

      <SheetContent>
        <div className="flex flex-col h-full overflow-y-auto">

          {/* Logo + título */}
          <div className="flex flex-col items-center gap-3 px-6 pt-10 pb-6 border-b border-white/10">
            <Image
              src="/PuerroXgame.png"
              alt="PuerroXGames"
              width={80}
              height={80}
              className="rounded-full"
            />
            <div className="text-center">
              <h2 className="text-lg font-black text-white">PuerroXGames</h2>
              <p className="text-xs text-white/30">Juegos de fútbol</p>
            </div>
          </div>

          <div className="flex flex-col gap-6 px-6 py-6">

            {/* Sobre el juego */}
            <section className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
                Sobre el juego
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                <strong className="text-white/80">Adivina el Partido</strong> es un juego
                donde tenés que identificar partidos históricos del fútbol a partir de pistas.
                Hay 4 niveles de dificultad, cada uno con 5 partidos para resolver.
              </p>
              <p className="text-sm text-white/60 leading-relaxed">
                Cuanto menos intentos uses, más puntos ganás. ¡Desbloqueá todos los niveles
                y buscá el puntaje perfecto!
              </p>
            </section>

            {/* Cómo jugar */}
            <section className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
                Cómo jugar
              </h3>
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

            {/* Stats */}
            {stats.levelsPlayed > 0 && (
              <section className="flex flex-col gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
                  Tus estadísticas
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { label: 'Puntaje',   value: stats.totalScore.toLocaleString() },
                    { label: 'Niveles',   value: stats.levelsPlayed },
                    { label: 'Perfectos', value: stats.levelsPerfect },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col items-center gap-1 p-3
                      rounded-xl bg-white/[0.04] border border-white/10">
                      <span className="text-base font-black text-white">{value}</span>
                      <span className="text-[10px] uppercase tracking-widest text-white/30">{label}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CTA */}
            <section className="flex flex-col gap-2 p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
              <p className="text-sm text-white/70 leading-relaxed">
                ¿Te gustó el juego? Podemos agregar más niveles, más partidos y nuevos modos de juego.
              </p>
              <p className="text-sm text-white/50 leading-relaxed">
                Mandanos feedback o sugerencias — cada idea ayuda a mejorar la experiencia. 🚀
              </p>
            </section>

            {/* Créditos */}
            <section className="flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-widest text-white/30">
                Créditos
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { name: 'Gastón Mogul',  role: 'Idea & contenido' },
                  { name: 'Perez Elías',   role: 'Diseño & desarrollo' },
                ].map(({ name, role }) => (
                  <div key={name} className="flex items-center justify-between py-2
                    border-b border-white/5 last:border-0">
                    <span className="text-sm font-semibold text-white/80">{name}</span>
                    <span className="text-xs text-white/30">{role}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* Footer */}
          <div className="mt-auto px-6 py-4 border-t border-white/10">
            <p className="text-xs text-white/20 text-center">PuerroXGames · Boca Estilo ⚽</p>
          <p className="text-xs text-white/15 text-center mt-1">Dedicada a Davo Xeneize 💙💛</p>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
