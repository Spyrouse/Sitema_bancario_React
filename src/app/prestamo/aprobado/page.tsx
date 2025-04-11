"use client"

import { useRouter } from "next/navigation"
import { Home, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrestamoAprobadoPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-950 to-red-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span>Inicio</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto">Préstamo Aprobado</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4 flex items-center justify-center min-h-[80vh]">
        <div className="max-w-md w-full">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-800 to-red-700 text-white rounded-t-lg pb-2">
              <div className="flex justify-center mt-4">
                <div className="bg-white rounded-full p-2">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
              </div>
              <CardTitle className="text-2xl mt-4">¡Préstamo Aprobado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <p className="text-lg">
                Tu solicitud de préstamo ha sido aprobada y los fondos han sido depositados en tu cuenta.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Monto aprobado:</span>
                  <span className="font-bold">$25,000.00</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Plazo:</span>
                  <span className="font-bold">24 meses</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Tasa de interés:</span>
                  <span className="font-bold">12.5% anual</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">Pago mensual:</span>
                  <span className="font-bold">$1,175.68</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 mt-2 pt-2">
                  <span className="text-muted-foreground">Fecha primer pago:</span>
                  <span className="font-bold">15/08/2024</span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground">
                Recibirás un correo electrónico con los detalles completos de tu préstamo.
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => router.push("/dashboard")} className="w-full bg-red-600 hover:bg-red-500">
                <span>Volver al Dashboard</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

