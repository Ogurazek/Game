import Image from 'next/image'
import { Menu } from 'lucide-react'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'

export default function AboutSheet({ children }: { children: React.ReactNode }) {
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
            {children}
          </div>

          <div className="mt-auto px-6 py-4 border-t border-white/10">
            <p className="text-xs text-white/20 text-center">PuerroXGames · Boca Estilo ⚽</p>
            <p className="text-xs text-white/15 text-center mt-1">Dedicada a Davo Xeneize 💙💛</p>
          </div>

        </div>
      </SheetContent>
    </Sheet>
  )
}
