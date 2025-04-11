"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MazeBankSidebar } from "@/components/ui/maze-bank-sidebar"

export default function ConfirmacionPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nombre = searchParams.get("nombre") || ""
  const cuenta = searchParams.get("cuenta") || ""
  const monto = searchParams.get("monto") || ""

  const [concepto, setConcepto] = useState("")
  const referencia = Math.floor(1000 + Math.random() * 9000) // Número aleatorio de 4 dígitos

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/transferencia/exito?referencia=${referencia}`)
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full">
        <MazeBankSidebar />

        <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Confirmación</h2>
              <p className="text-muted-foreground">Revisa los detalles de tu transferencia</p>
            </div>

            <Card>
              <CardHeader className="bg-gradient-to-r from-red-800 to-red-700 text-white rounded-t-lg">
                <CardTitle className="text-lg">Resumen de envío</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-6">
                <div className="space-y-2">
                  <h3 className="font-semibold">Desde que cuenta envías</h3>
                  <div className="text-sm">Cuenta: 5432 1098 7654 3210</div>
                  <div className="text-sm">Saldo: $45,750.00</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">A quien envías</h3>
                  <div className="text-sm">Nombre: {nombre}</div>
                  <div className="text-sm">Número de cuenta: {cuenta}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Cuánto quieres enviar</h3>
                  <div className="text-lg font-bold text-red-600">${monto}</div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Datos del envío</h3>
                  <div className="space-y-2">
                    <Label htmlFor="concepto">Concepto de pago</Label>
                    <Input
                      id="concepto"
                      value={concepto}
                      onChange={(e) => setConcepto(e.target.value)}
                      placeholder="Ej: Pago de servicios"
                      required
                    />
                  </div>
                  <div className="text-sm">Número de referencia: {referencia}</div>
                </div>
              </CardContent>
            </Card>

            <form onSubmit={handleSubmit} className="space-y-6">
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-500">
                Enviar
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

