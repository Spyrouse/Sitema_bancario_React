import Image from "next/image"

export function MazeBankSidebar() {
  return (
    <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-b from-red-500 to-red-800 lg:flex">
      <div className="flex flex-col items-center justify-center space-y-6 px-8 text-center">
        <div className="relative h-32 w-32">
          <Image src="/assets/logo.jpg" alt="Maze Bank Logo" width={500} height={500} className="object-contain" />
        </div>
        <h1 className="text-4xl font-bold text-white">Maze Bank</h1>
        <p className="text-xl text-white/80">Consuta tu estado de cuenta a tu alcance</p>
      </div>
    </div>
  )
}


