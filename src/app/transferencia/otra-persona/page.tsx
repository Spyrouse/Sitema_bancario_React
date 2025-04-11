"use client"

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MazeBankSidebar } from "@/components/ui/maze-bank-sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Cuentas de ejemplo que estarían en el sistema
const cuentasGuardadas = [
  { id: 1, nombre: "Carlos Méndez", numeroCuenta: "1234 5678 9012 3456", image: "/placeholder.svg?height=40&width=40" },
  {
    id: 2,
    nombre: "María González",
    numeroCuenta: "2345 6789 0123 4567",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    nombre: "Carlos Rodríguez",
    numeroCuenta: "3456 7890 1234 5678",
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function OtraPersonaPage() {
  const router = useRouter()

  const seleccionarCuenta = (nombre: string, cuenta: string) => {
    router.push(`/transferencia/monto?nombre=${encodeURIComponent(nombre)}&cuenta=${cuenta.replace(/\s/g, "")}`)
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full">
        <MazeBankSidebar />

        <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Seleccionar cuenta</h2>
              <p className="text-muted-foreground">Elige una cuenta guardada</p>
            </div>

            <div className="space-y-4">
              {cuentasGuardadas.map((cuenta) => (
                <Card
                  key={cuenta.id}
                  className="cursor-pointer hover:bg-red-50 border border-red-100"
                  onClick={() => seleccionarCuenta(cuenta.nombre, cuenta.numeroCuenta)}
                >
                  <CardContent className="p-4 flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={cuenta.image} alt={cuenta.nombre} />
                      <AvatarFallback>{cuenta.nombre.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{cuenta.nombre}</div>
                      <div className="text-sm text-muted-foreground">{cuenta.numeroCuenta}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Button
              onClick={() => router.push("/transferencia")}
              variant="outline"
              className="w-full border-red-400 hover:bg-red-100 text-red-600"
            >
              Volver
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

