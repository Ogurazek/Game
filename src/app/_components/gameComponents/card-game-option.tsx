export default function CardGameOption({ title }: { title: string }) {
    return (
        <div
            className="
        w-[220px] h-[60px] 
        hd:w-[240px] hd:h-[60px]
        fhd:w-[320px] fhd:h-[85px]

        bg-gradient-to-r from-yellow-500 to-yellow-600 
        rounded-2xl 
        shadow-lg 
        flex items-center justify-center
        text-base sm:text-lg md:text-lg lg:text-xl hd:text-[22px] fhd:text-2xl
        font-semibold text-white 
        cursor-pointer 
        transition-all duration-300 
        hover:scale-105 hover:shadow-xl hover:from-yellow-400 hover:to-yellow-500
        active:scale-95
      "
        >
            <p>{title}</p>
        </div>
    )
}
