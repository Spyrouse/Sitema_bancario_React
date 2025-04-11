import Link from "next/link"
import Image from "next/image"
import type { ReactNode } from "react"
import { Home, ArrowRightLeft, CreditCard, Clock, User, Settings, LogOut } from "lucide-react"

interface SidebarLayoutProps {
  children: ReactNode
}

export default function SidebarLayout({ children }: SidebarLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Left sidebar with logo and gradient background */}
      <div className="hidden w-1/5 bg-gradient-to-b from-red-500 to-red-800 md:flex flex-col">
        <div className="flex flex-col items-center p-6">
          <div className="mb-2">
            <Image src="/maze-bank-logo.png" alt="Maze Bank Logo" width={80} height={80} className="h-auto w-auto" />
          </div>
          <h1 className="text-xl font-bold text-white">Maze Bank</h1>
        </div>

        <nav className="mt-8 flex-1 space-y-1 px-4">
          <Link href="/dashboard" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <Home className="mr-3 h-5 w-5" />
            <span>Inicio</span>
          </Link>

          <Link href="/transferencia" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <ArrowRightLeft className="mr-3 h-5 w-5" />
            <span>Transferencias</span>
          </Link>

          <Link href="#" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <CreditCard className="mr-3 h-5 w-5" />
            <span>Tarjetas</span>
          </Link>

          <Link href="#" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <Clock className="mr-3 h-5 w-5" />
            <span>Historial</span>
          </Link>

          <Link href="#" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <User className="mr-3 h-5 w-5" />
            <span>Perfil</span>
          </Link>

          <Link href="#" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <Settings className="mr-3 h-5 w-5" />
            <span>Configuración</span>
          </Link>
        </nav>

        <div className="mt-auto p-4">
          <Link href="/" className="flex items-center rounded-md px-4 py-2 text-white hover:bg-red-700">
            <LogOut className="mr-3 h-5 w-5" />
            <span>Cerrar Sesión</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Mobile header */}
        <div className="flex items-center justify-between bg-red-600 p-4 md:hidden">
          <div className="flex items-center">
            <Image src="/maze-bank-logo.png" alt="Maze Bank Logo" width={40} height={40} className="h-auto w-auto" />
            <h1 className="ml-2 text-lg font-bold text-white">Maze Bank</h1>
          </div>
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Page content */}
        <main>{children}</main>
      </div>
    </div>
  )
}

