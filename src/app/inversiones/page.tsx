"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, TrendingUp, TrendingDown, ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar } from "@/components/ui/avatar"

// Datos estáticos de criptomonedas
const criptomonedas = [
  { id: 1, nombre: "Bitcoin", simbolo: "BTC", precio: 65432.21, cambio: "+2.5%", color: "text-green-500" },
  { id: 2, nombre: "Ethereum", simbolo: "ETH", precio: 3456.78, cambio: "+1.8%", color: "text-green-500" },
  { id: 3, nombre: "Cardano", simbolo: "ADA", precio: 0.45, cambio: "-0.7%", color: "text-red-500" },
  { id: 4, nombre: "Solana", simbolo: "SOL", precio: 143.21, cambio: "+5.2%", color: "text-green-500" },
  { id: 5, nombre: "Ripple", simbolo: "XRP", precio: 0.56, cambio: "-1.2%", color: "text-red-500" },
  { id: 6, nombre: "Polkadot", simbolo: "DOT", precio: 6.78, cambio: "+0.9%", color: "text-green-500" },
  { id: 7, nombre: "Dogecoin", simbolo: "DOGE", precio: 0.12, cambio: "+15.3%", color: "text-green-500" },
  { id: 8, nombre: "Avalanche", simbolo: "AVAX", precio: 34.56, cambio: "-2.1%", color: "text-red-500" },
  { id: 9, nombre: "Chainlink", simbolo: "LINK", precio: 14.32, cambio: "+3.4%", color: "text-green-500" },
  { id: 10, nombre: "Polygon", simbolo: "MATIC", precio: 0.67, cambio: "-0.5%", color: "text-red-500" },
]

// Datos de rendimiento de inversión
const rendimientoData = [
  { mes: "Ene", valor: 22000 },
  { mes: "Feb", valor: 23500 },
  { mes: "Mar", valor: 24200 },
  { mes: "Abr", valor: 23800 },
  { mes: "May", valor: 25000 },
  { mes: "Jun", valor: 26500 },
  { mes: "Jul", valor: 28000 },
]

export default function InversionesPage() {
  const router = useRouter()
  const [paginaActual, setPaginaActual] = useState(1)
  const elementosPorPagina = 5

  // Calcular índices para paginación
  const indiceInicial = (paginaActual - 1) * elementosPorPagina
  const indiceFinal = indiceInicial + elementosPorPagina
  const criptosPaginadas = criptomonedas.slice(indiceInicial, indiceFinal)
  const totalPaginas = Math.ceil(criptomonedas.length / elementosPorPagina)

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-950 to-red-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span>Inicio</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto">Inversiones</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Rendimiento Card */}
          <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white">
            <CardHeader>
              <CardTitle>Rendimiento de Inversiones</CardTitle>
              <CardDescription className="text-red-200">Resumen de tu portafolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-red-200">Saldo invertido</p>
                  <p className="text-2xl font-bold">$25,000.00</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-red-200">Rendimiento</p>
                  <p className="text-2xl font-bold text-green-400">+12.5%</p>
                </div>
              </div>

              <p className="text-sm text-red-200 mb-2">Activos comprados: 5</p>

              {/* Gráfico simplificado */}
              <div className="h-48 w-full mt-4 bg-red-900/50 rounded-lg p-4">
                <div className="h-full w-full flex items-end justify-between">
                  {rendimientoData.map((item, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-green-400 w-8"
                        style={{
                          height: `${(item.valor / 30000) * 100}%`,
                          minHeight: "10px",
                        }}
                      ></div>
                      <span className="text-xs mt-2">{item.mes}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                className="bg-red-600 hover:bg-red-500"
                onClick={() => router.push("/inversiones/trading?operacion=comprar")}
              >
                <TrendingUp className="mr-2 h-4 w-4" />
                Comprar
              </Button>
              <Button
                className="bg-red-600 hover:bg-red-500"
                onClick={() => router.push("/inversiones/trading?operacion=vender")}
              >
                <TrendingDown className="mr-2 h-4 w-4" />
                Vender
              </Button>
            </CardFooter>
          </Card>

          {/* Criptomonedas */}
          <Card>
            <CardHeader>
              <CardTitle>Criptomonedas Disponibles</CardTitle>
              <CardDescription>Selecciona una criptomoneda para invertir</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criptosPaginadas.map((cripto) => (
                  <div key={cripto.id}>
                    <div className="flex items-center justify-between py-2">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10 bg-red-100 text-red-800">
                          <span className="font-bold">{cripto.simbolo.substring(0, 2)}</span>
                        </Avatar>
                        <div>
                          <p className="font-medium">{cripto.nombre}</p>
                          <p className="text-sm text-muted-foreground">{cripto.simbolo}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${cripto.precio.toLocaleString()}</p>
                        <p className={`text-sm ${cripto.color}`}>{cripto.cambio}</p>
                      </div>
                    </div>
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                disabled={paginaActual === 1}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Anterior
              </Button>
              <span className="text-sm text-muted-foreground">
                Página {paginaActual} de {totalPaginas}
              </span>
              <Button
                variant="outline"
                onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                disabled={paginaActual === totalPaginas}
              >
                Siguiente
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}

