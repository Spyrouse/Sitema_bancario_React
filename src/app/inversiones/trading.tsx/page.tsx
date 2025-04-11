"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Home, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Datos estáticos de criptomonedas
const criptomonedas = [
  { id: 1, nombre: "Bitcoin", simbolo: "BTC", precio: 65432.21 },
  { id: 2, nombre: "Ethereum", simbolo: "ETH", precio: 3456.78 },
  { id: 3, nombre: "Cardano", simbolo: "ADA", precio: 0.45 },
  { id: 4, nombre: "Solana", simbolo: "SOL", precio: 143.21 },
  { id: 5, nombre: "Ripple", simbolo: "XRP", precio: 0.56 },
  { id: 6, nombre: "Polkadot", simbolo: "DOT", precio: 6.78 },
  { id: 7, nombre: "Dogecoin", simbolo: "DOGE", precio: 0.12 },
  { id: 8, nombre: "Avalanche", simbolo: "AVAX", precio: 34.56 },
  { id: 9, nombre: "Chainlink", simbolo: "LINK", precio: 14.32 },
  { id: 10, nombre: "Polygon", simbolo: "MATIC", precio: 0.67 },
]

export default function TradingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const operacion = searchParams.get("operacion") || "comprar"

  const [criptoSeleccionada, setCriptoSeleccionada] = useState("")
  const [cantidad, setCantidad] = useState("")
  const [operacionExitosa, setOperacionExitosa] = useState(false)

  const criptoActual = criptomonedas.find((c) => c.simbolo === criptoSeleccionada)
  const valorTotal = criptoActual && cantidad ? criptoActual.precio * Number.parseFloat(cantidad) : 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para procesar la compra/venta
    setOperacionExitosa(true)

    // Después de 2 segundos, redirigir a la página de inversiones
    setTimeout(() => {
      router.push("/inversiones")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-950 to-red-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span>Inicio</span>
          </Link>
          <h1 className="text-xl font-bold mx-auto">
            {operacion === "comprar" ? "Comprar Criptomonedas" : "Vender Criptomonedas"}
          </h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-md mx-auto space-y-8">
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => router.push("/inversiones")}>
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Inversiones</span>
          </Button>

          {operacionExitosa ? (
            <Alert className="bg-green-50 border-green-200">
              <Check className="h-5 w-5 text-green-500" />
              <AlertTitle className="text-green-800">¡Operación realizada con éxito!</AlertTitle>
              <AlertDescription className="text-green-700">
                Tu {operacion === "comprar" ? "compra" : "venta"} de criptomonedas ha sido procesada correctamente.
                Redirigiendo a la página de inversiones...
              </AlertDescription>
            </Alert>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{operacion === "comprar" ? "Comprar Criptomonedas" : "Vender Criptomonedas"}</CardTitle>
                <CardDescription>
                  {operacion === "comprar"
                    ? "Selecciona la criptomoneda que deseas comprar"
                    : "Selecciona la criptomoneda que deseas vender"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="criptomoneda">Criptomoneda</Label>
                    <Select value={criptoSeleccionada} onValueChange={setCriptoSeleccionada} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una criptomoneda" />
                      </SelectTrigger>
                      <SelectContent>
                        {criptomonedas.map((cripto) => (
                          <SelectItem key={cripto.id} value={cripto.simbolo}>
                            {cripto.nombre} ({cripto.simbolo}) - ${cripto.precio.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cantidad">Cantidad</Label>
                    <Input
                      id="cantidad"
                      type="number"
                      step="0.0001"
                      min="0.0001"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                      placeholder="0.00"
                      required
                    />
                  </div>

                  {criptoSeleccionada && cantidad && (
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-muted-foreground">Resumen de la operación:</p>
                      <div className="flex justify-between mt-2">
                        <span>Precio unitario:</span>
                        <span className="font-medium">${criptoActual?.precio.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>Cantidad:</span>
                        <span className="font-medium">
                          {Number.parseFloat(cantidad).toLocaleString()} {criptoSeleccionada}
                        </span>
                      </div>
                      <div className="flex justify-between mt-1 text-lg font-bold">
                        <span>Valor total:</span>
                        <span className="text-red-600">${valorTotal.toLocaleString()}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-500"
                    disabled={!criptoSeleccionada || !cantidad}
                  >
                    {operacion === "comprar" ? "Comprar" : "Vender"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}

