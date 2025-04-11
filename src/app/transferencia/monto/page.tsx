"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MazeBankSidebar } from "@/components/ui/maze-bank-sidebar"

export default function MontoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const nombre = searchParams.get("nombre") || ""
  const cuenta = searchParams.get("cuenta") || ""

  const [monto, setMonto] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/transferencia/confirmacion?nombre=${encodeURIComponent(nombre)}&cuenta=${cuenta}&monto=${monto}`)
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full">
        <MazeBankSidebar />

        <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Transferencia</h2>
              <p className="text-muted-foreground">Ingresa el monto a transferir</p>
            </div>

            <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white border-0">
              <CardHeader>
                <CardTitle className="text-lg">¿Desde qué cuenta enviás?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="font-medium">Cuenta: 5432 1098 7654 3210</div>
                <div className="text-xl font-bold">Saldo: $45,750.00</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="monto">¿Cuánto quieres enviar?</Label>
                    <Input
                      id="monto"
                      type="number"
                      value={monto}
                      onChange={(e) => setMonto(e.target.value)}
                      placeholder="$0.00"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Monto máximo de envío: $45,750.00</p>
                  </div>

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-500">
                    Continuar
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

