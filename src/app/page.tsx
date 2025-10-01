import CardGames from "./_components/card-games";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-boca bg-cover bg-center">
        {/* Overlay superior (oscurece toda la pantalla) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/70" />

        {/* Fade inferior */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#020613] to-transparent" />

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 bg-[#020613]/40">
          <div className="flex gap-2">
            <h1 className="text-6xl font-extrabold text-white drop-shadow-lg">
              Bienvenido
            </h1>
            <span className="text-yellow-500 text-6xl font-extrabold drop-shadow-lg">
              Xeneize
            </span>
          </div>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quod,
            autem dicta dolorum nostrum temporibus tempore dignissimos. Molestiae
            consequatur, repudiandae similique assumenda ipsam labore.
          </p>
          <button className="mt-8 px-10 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-yellow-700 transition">
            Ver Juegos
          </button>
        </div>
      </div>

      <section className="h-[1000px] w-full flex flex-col items-center justify-center text-white">
        <div className="w-[52rem] h-auto p-3 rounded-2xl flex flex-col gap-8">
          <div className="w-full flex flex-col gap-4">
            <span className="text-4xl font-bold text-blue-500">Juegos</span>
            <p className="w-[40rem]">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea quod, autem dicta dolorum nostrum temporibus tempore dignissimos.</p>
          </div>
          <div className="w-full flex gap-8 items-center justify-center">
            <CardGames />
            <CardGames />
          </div>
        </div>
      </section>

      <section className="h-[600px] w-full flex flex-col items-center justify-center text-white px-4">
        <div className="w-[52rem] h-auto p-8 rounded-2xl flex gap-8 items-center bg-gray-900/50 shadow-lg">
          <div className="w-96 h-60 overflow-hidden rounded-xl shadow-md">
            <Image
              src="/FotoProfile.png"
              alt="Imagen del creador"
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full flex flex-col gap-4">
            <span className="text-3xl font-bold tracking-wide text-yellow-400 drop-shadow">
              Soy Perez Elías
            </span>
            <p className="text-base leading-relaxed text-gray-300">
              Creador de este sitio web Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Vel, modi placeat iure, aut incidunt sapiente
              debitis ipsum ex, ratione iusto perspiciatis! Accusamus voluptates
              tenetur expedita temporibus mollitia deleniti sit earum!
            </p>
          </div>
        </div>
      </section>

    </>
  );
}




{/* <h1 className="text-4xl font-semibold">Juegos</h1>
      <section className="w-[37.5rem] h-auto border-l-8 border-amber-300 p-6 rounded-2xl flex flex-col gap-4">

        <CardGames
          title="Quizz Boca"
          description="Este primero juego se trata sobre un quizz de boca, consta con 15 preguntas mutiplechoice"
          urlImage="/BocaPrueba.png"
        />
        <CardGames
          title="Quizz Boca"
          description="Este primero juego se trata sobre un quizz de boca, consta con 15 preguntas mutiplechoice"
          urlImage="/BocaPrueba.png"
        />


      </section> */}