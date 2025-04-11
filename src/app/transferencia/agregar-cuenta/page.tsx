"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MazeBankSidebar } from "@/components/ui/maze-bank-sidebar"

export default function AgregarCuentaPage() {
  const router = useRouter()
  const [nombre, setNombre] = useState("")
  const [numeroCuenta, setNumeroCuenta] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (numeroCuenta.length !== 16) {
      setError("El número de cuenta debe tener 16 dígitos")
      return
    }
    // Aquí se guardaría la cuenta en un sistema real
    router.push(`/transferencia/monto?nombre=${encodeURIComponent(nombre)}&cuenta=${numeroCuenta}`)
  }

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full">
        <MazeBankSidebar />

        <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Agregar cuenta</h2>
              <p className="text-muted-foreground">Ingresa los datos de la cuenta</p>
            </div>

            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre">Nombre del contacto</Label>
                      <Input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="numeroCuenta">Número de cuenta</Label>
                      <Input
                        id="numeroCuenta"
                        value={numeroCuenta}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "") // Solo permite dígitos
                          if (value.length <= 16) {
                            setNumeroCuenta(value)
                            setError("")
                          }
                        }}
                        maxLength={16}
                        pattern="[0-9]{16}"
                        placeholder="Ingresa 16 dígitos"
                        required
                      />
                      {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
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

