"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Home, ArrowLeft, DollarSign, Calendar, Percent } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"

export default function PrestamoPage() {
  const router = useRouter()
  const [monto, setMonto] = useState(10000)
  const [plazo, setPlazo] = useState(12)
  const [motivo, setMotivo] = useState("")

  // Cálculos de préstamo
  const tasaInteres = 12.5 // 12.5% anual
  const tasaMensual = tasaInteres / 12 / 100
  const pagoMensual = (monto * tasaMensual) / (1 - Math.pow(1 + tasaMensual, -plazo))
  const totalPagar = pagoMensual * plazo
  const interesesTotales = totalPagar - monto

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/prestamo/aprobado")
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
          <h1 className="text-xl font-bold mx-auto">Solicitud de Préstamo</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-2xl mx-auto space-y-8">
          <Button variant="outline" className="flex items-center space-x-2" onClick={() => router.push("/dashboard")}>
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Dashboard</span>
          </Button>

          <Card>
            <CardHeader className="bg-gradient-to-r from-red-800 to-red-700 text-white rounded-t-lg">
              <CardTitle>Solicitud de Préstamo Personal</CardTitle>
              <CardDescription className="text-red-200">
                Completa el formulario para solicitar tu préstamo
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Monto del préstamo */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="monto" className="text-lg font-medium flex items-center">
                      <DollarSign className="h-5 w-5 mr-1 text-red-600" />
                      Monto del préstamo
                    </Label>
                    <span className="text-xl font-bold text-red-600">${monto.toLocaleString()}</span>
                  </div>
                  <Slider
                    id="monto"
                    min={5000}
                    max={100000}
                    step={1000}
                    value={[monto]}
                    onValueChange={(value) => setMonto(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>$5,000</span>
                    <span>$100,000</span>
                  </div>
                </div>

                {/* Plazo del préstamo */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="plazo" className="text-lg font-medium flex items-center">
                      <Calendar className="h-5 w-5 mr-1 text-red-600" />
                      Plazo (meses)
                    </Label>
                    <span className="text-xl font-bold text-red-600">{plazo} meses</span>
                  </div>
                  <Slider
                    id="plazo"
                    min={12}
                    max={60}
                    step={12}
                    value={[plazo]}
                    onValueChange={(value) => setPlazo(value[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>12 meses</span>
                    <span>60 meses</span>
                  </div>
                </div>

                {/* Motivo del préstamo */}
                <div className="space-y-2">
                  <Label htmlFor="motivo">Motivo del préstamo</Label>
                  <Select value={motivo} onValueChange={setMotivo} required>
                    <SelectTrigger id="motivo">
                      <SelectValue placeholder="Selecciona un motivo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vivienda">Mejoras en vivienda</SelectItem>
                      <SelectItem value="vehiculo">Compra de vehículo</SelectItem>
                      <SelectItem value="educacion">Educación</SelectItem>
                      <SelectItem value="deudas">Consolidación de deudas</SelectItem>
                      <SelectItem value="negocio">Inversión en negocio</SelectItem>
                      <SelectItem value="otro">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Resumen del préstamo */}
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-lg flex items-center">
                    <Percent className="h-5 w-5 mr-1 text-red-600" />
                    Resumen del préstamo
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Tasa de interés anual</p>
                      <p className="font-medium">{tasaInteres}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pago mensual</p>
                      <p className="font-medium">${pagoMensual.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total a pagar</p>
                      <p className="font-medium">${totalPagar.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Intereses totales</p>
                      <p className="font-medium">${interesesTotales.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-red-600 hover:bg-red-500">
                  Solicitar Préstamo
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

