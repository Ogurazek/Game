import Image from "next/image"
import CardGameOption from "../_components/gameComponents/card-game-option"

export default function PageGame() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-12 p-4">
            {/* Imagen principal */}
            <div className="w-full max-w-[1100px] h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl border-[8px] border-gray-900 bg-gray-900 overflow-hidden">
                <Image
                    src="/background-image-boca.jpeg"
                    alt="Imagen del creador"
                    width={700}
                    height={900}
                    className="w-full h-full object-cover rounded-2xl"
                />
            </div>

            {/* Pregunta */}
            <p className="text-center text-sm md:text-base lg:text-lg leading-relaxed max-w-xl">
                Con qué equipo el puerro ganó la primer Champions League?
            </p>

            {/* Opciones */}
            <div className="w-[1000px] flex items-center justify-center gap-4 md:gap-8 lg:gap-12 px-2 flex-wrap">
                <CardGameOption title="Manchester City" />
                <CardGameOption title="Manchester United" />
                <CardGameOption title="Real Madrid" />
                <CardGameOption title="Chelsea" />
            </div>
        </div>
    )
}
