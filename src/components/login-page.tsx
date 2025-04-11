"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log("Iniciando sesión con:", username, password)

    // Después de la autenticación exitosa, redirige al usuario al dashboard
    router.push("/dashboard")
  }

  return (
    <div className="flex min-h-screen w-full">
      {/* Apartado del lado izquierdo */}
      <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-b from-red-500 to-red-800 lg:flex">
        <div className="flex flex-col items-center justify-center space-y-6 px-8 text-center">
          <div className="relative h-32 w-32">
            <Image src="/assets/logo.jpg" alt="Maze Bank Logo" width={500} height={500} className="object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-white">Maze Bank</h1>
          <p className="text-xl text-white/80">Consuta tu estado de cuenta a tu alcance</p>
        </div>
      </div>

      {/* Apartado del lado derecho */}
      <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Logo para móviles */}
          <div className="flex flex-col items-center justify-center space-y-2 lg:hidden">
            <div className="relative h-20 w-20">
              <Image src="/assets/logo.jpg" alt="Maze Bank Logo" width={200} height={200} className="object-contain" />
            </div>
            <h1 className="text-2xl font-bold text-red-600">Maze Bank</h1>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Bienvenido</h2>
              <p className="text-muted-foreground">Ingresa tus credenciales para acceder</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Correo</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-right">
                  <Link href="/recuperar-contrasena" className="text-sm text-red-600 hover:underline">
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                Iniciar sesión
              </Button>
            </form>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                ¿Usuario nuevo?{" "}
                <Link href="/register" className="text-red-600 hover:underline">
                  Regístrate aquí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

