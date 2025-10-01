import Image from "next/image"

export default function CardGames() {
    return (
        <>
            <div className="w-96 h-[450px] bg-[#0d1326] cursor-pointer transform transition-transform duration-300 hover:translate-y-[-5px] hover:scale-105 hover:rotate-1 rounded-2xl overflow-hidden">
                <div className="h-[250px] w-full">
                    <Image src="/BocaPrueba.png" alt="Imagen del juego" width={400} height={400} className="w-full h-full object-cover" />
                </div>




                <div className="w-full flex flex-col p-2 gap-4">
                    <p className="font-semibold text-blue-400 text-2xl">Adivina Puerro</p>
                    <div className="rounded-2xl bg-green-600 max-w-30 h-4 flex justify-center items-center font-medium text-green-200">Fácil</div>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit harum in dicta officiis, natus quae mollitia a explicabo officia perspiciatis rem animi error ipsa..</p>
                </div>
            </div>
        </>
    )
}