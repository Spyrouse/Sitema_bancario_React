"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Home,
  HelpCircle,
  FileText,
  LogOut,
  ChevronDown,
  ChevronUp,
  Send,
  CreditCard,
  TrendingUp,
  DollarSign,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"

export default function Dashboard() {
  const [showFrequentUsers, setShowFrequentUsers] = useState(false)
  const [showTransactionHistory, setShowTransactionHistory] = useState(false)
  const [userPhoto, setUserPhoto] = useState("/placeholder.svg?height=100&width=100")

  const router = useRouter()

  // Datos de ejemplo para la gráfica de inversiones
  const investmentData = [
    { name: "Ene", value: 4000 },
    { name: "Feb", value: 3000 },
    { name: "Mar", value: 5000 },
    { name: "Abr", value: 2780 },
    { name: "May", value: 1890 },
    { name: "Jun", value: 2390 },
    { name: "Jul", value: 3490 },
  ]

  // Usuarios frecuentes de ejemplo
  const frequentUsers = [
    { id: 1, name: "Carlos Méndez", image: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Ana García", image: "/placeholder.svg?height=40&width=40" },
    { id: 3, name: "Roberto Sánchez", image: "/placeholder.svg?height=40&width=40" },
    { id: 4, name: "María López", image: "/placeholder.svg?height=40&width=40" },
  ]

  // Historial de transacciones de ejemplo
  const transactionHistory = [
    { id: 1, name: "Carlos Méndez", amount: "$1,500.00", date: "15/03/2024" },
    { id: 2, name: "Ana García", amount: "$750.00", date: "10/03/2024" },
    { id: 3, name: "Roberto Sánchez", amount: "$2,300.00", date: "05/03/2024" },
    { id: 4, name: "María López", amount: "$500.00", date: "01/03/2024" },
    { id: 5, name: "Juan Pérez", amount: "$1,200.00", date: "25/02/2024" },
  ]

  // Determinar el tipo de tarjeta basado en el primer dígito
  const cardNumber = "5432 1098 7654 3210"
  const firstDigit = cardNumber.charAt(0)

  const getCardType = (digit: string) => {
    if (digit === "4") return "Maze Bronce"
    if (digit === "5") return "Maze Platinum"
    if (digit === "3") return "Maze Clasic"
    if (digit === "6") return "Maze Gold"
    return "Maze Standard"
  }

  const getCardClass = (digit: string) => {
    if (digit === "4") return "bg-gradient-to-r from-amber-700 to-amber-500" // Bronce
    if (digit === "5") return "bg-gradient-to-r from-slate-400 to-slate-300" // Platinum
    if (digit === "3") return "bg-gradient-to-r from-red-600 to-white" // Clasic
    if (digit === "6") return "bg-gradient-to-r from-yellow-500 to-yellow-300" // Gold
    return "bg-gradient-to-r from-gray-700 to-gray-500" // Default
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setUserPhoto(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    // Here you would add any logout logic like clearing tokens/cookies
    // For example: localStorage.removeItem("token")

    // Redirect to login page
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-red-700">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-950 to-red-900 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Left side of header */}
          <div className="flex items-center space-x-6">
            {/* Home button */}
            <Link href="/dashboard" className="flex flex-col items-center">
              <Home className="h-6 w-6" />
              <span className="text-xs mt-1">Inicio</span>
            </Link>

            {/* Account button with popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center p-0 h-auto">
                  <CreditCard className="h-6 w-6" />
                  <span className="text-xs mt-1">Cuenta</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Información de Cuenta</h4>
                  <div className="grid gap-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Nombre:</span>
                      <span>Juan Rodríguez</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Número de cuenta:</span>
                      <span>**** **** **** 3210</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tipo de cuenta:</span>
                      <span>{getCardType(firstDigit)}</span>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Help button with popover */}
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" className="flex flex-col items-center p-0 h-auto">
                  <HelpCircle className="h-6 w-6" />
                  <span className="text-xs mt-1">Ayuda</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-2">
                  <h4 className="font-medium">Preguntas Frecuentes</h4>
                  <ul className="space-y-1">
                    <li>¿Cómo puedo realizar una transferencia?</li>
                    <li>¿Cómo cambio mi contraseña?</li>
                    <li>¿Cómo solicito un préstamo?</li>
                    <li>¿Cómo reporto una tarjeta perdida?</li>
                    <li>¿Cómo actualizo mis datos personales?</li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>

            {/* Policies button */}
            <Link href="/policies" className="flex flex-col items-center">
              <FileText className="h-6 w-6" />
              <span className="text-xs mt-1">Políticas</span>
            </Link>

            {/* Account alias and logout */}
            <div className="ml-6 flex flex-col">
              <span className="font-medium">Juan Rodríguez</span>
              <button
                onClick={handleLogout}
                className="text-sm flex items-center text-red-300 hover:text-red-100 bg-transparent border-none cursor-pointer"
              >
                <LogOut className="h-3 w-3 mr-1" />
                Cerrar sesión
              </button>
            </div>
          </div>

          {/* Right side of header - User profile */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" className="rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={userPhoto} alt="Usuario" />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Perfil de Usuario</DialogTitle>
                <DialogDescription>Administra tu perfil y cuenta</DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4 py-4">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userPhoto} alt="Usuario" />
                  <AvatarFallback>JR</AvatarFallback>
                </Avatar>
                <div className="flex flex-col space-y-2 w-full">
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Button variant="outline" className="w-full">
                      Cambiar foto
                    </Button>
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handlePhotoChange}
                    />
                  </label>
                  <Button variant="destructive">Eliminar cuenta</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column */}
          <div className="space-y-8">
            {/* Credit Card */}
            <Card className={`${getCardClass(firstDigit)} text-white overflow-hidden`}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm opacity-80">Tarjeta de Crédito</p>
                    <h2 className="text-xl font-bold mt-1">{getCardType(firstDigit)}</h2>
                  </div>
                  <div className="flex flex-col items-end">
                    <Image
                      src="/placeholder.svg?height=60&width=40"
                      alt="Chip"
                      width={60}
                      height={40}
                      className="mb-2"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-lg tracking-wider font-mono">{cardNumber}</p>
                </div>

                <div className="mt-6 flex justify-between">
                  <div>
                    <p className="text-xs opacity-80">Fecha de vencimiento</p>
                    <p className="font-mono">12/28</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">CVV</p>
                    <p className="font-mono">***</p>
                  </div>
                  <div>
                    <p className="text-xs opacity-80">Tipo</p>
                    <p className="font-mono">Crédito</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Investments */}
            <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white">
              <CardHeader>
                <CardTitle>Inversiones</CardTitle>
                <CardDescription className="text-red-200">Resumen de tus inversiones</CardDescription>
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

                <div className="h-48 w-full mt-4 bg-red-900/50 rounded-lg p-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={investmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="name" stroke="#ffffff80" />
                      <YAxis stroke="#ffffff80" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#4ade80"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-500" onClick={() => router.push("/inversiones")}>
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Invertir
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Right column */}
          <div className="space-y-8">
            {/* Transfer Card */}
            <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white">
              <CardHeader>
                <CardTitle>Transferencia</CardTitle>
                <CardDescription className="text-red-200">Envía dinero a tus contactos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-red-200">Saldo disponible para transferir</p>
                  <p className="text-2xl font-bold">$45,750.00</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-500" onClick={() => router.push("/transferencia")}>
                  <Send className="mr-2 h-4 w-4" />
                  Enviar
                </Button>
              </CardFooter>
            </Card>

            {/* Frequent Users */}
            <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white">
              <CardHeader>
                <CardTitle>Usuarios Frecuentes</CardTitle>
                <CardDescription className="text-red-200">
                  Contactos a los que envías dinero frecuentemente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* First user always visible */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={frequentUsers[0].image} alt={frequentUsers[0].name} />
                        <AvatarFallback>{frequentUsers[0].name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{frequentUsers[0].name}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-400 text-white hover:bg-red-600"
                      onClick={() =>
                        router.push(
                          `/transferencia/monto?nombre=${encodeURIComponent(frequentUsers[0].name)}&cuenta=1234567890123456`,
                        )
                      }
                    >
                      Transferir
                    </Button>
                  </div>

                  {/* Expandable list */}
                  {showFrequentUsers && (
                    <div className="space-y-4 pt-2">
                      {frequentUsers.slice(1).map((user) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={user.image} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-400 text-white hover:bg-red-600"
                            onClick={() =>
                              router.push(
                                `/transferencia/monto?nombre=${encodeURIComponent(user.name)}&cuenta=${1234567890000000 + user.id}`,
                              )
                            }
                          >
                            Transferir
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-red-200 hover:text-white hover:bg-red-600/20"
                  onClick={() => setShowFrequentUsers(!showFrequentUsers)}
                >
                  {showFrequentUsers ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Mostrar menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Mostrar más
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Transaction History */}
            <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white">
              <CardHeader>
                <CardTitle>Historial de Transferencias</CardTitle>
                <CardDescription className="text-red-200">Últimas transferencias realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* First transaction always visible */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{transactionHistory[0].name}</p>
                      <p className="text-sm text-red-200">{transactionHistory[0].date}</p>
                    </div>
                    <p className="font-mono">{transactionHistory[0].amount}</p>
                  </div>

                  <Separator className="bg-red-600/30" />

                  {/* Expandable list */}
                  {showTransactionHistory && (
                    <div className="space-y-4">
                      {transactionHistory.slice(1).map((transaction) => (
                        <div key={transaction.id}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">{transaction.name}</p>
                              <p className="text-sm text-red-200">{transaction.date}</p>
                            </div>
                            <p className="font-mono">{transaction.amount}</p>
                          </div>
                          <Separator className="bg-red-600/30 mt-4" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="ghost"
                  className="w-full text-red-200 hover:text-white hover:bg-red-600/20"
                  onClick={() => setShowTransactionHistory(!showTransactionHistory)}
                >
                  {showTransactionHistory ? (
                    <>
                      <ChevronUp className="mr-2 h-4 w-4" />
                      Mostrar menos
                    </>
                  ) : (
                    <>
                      <ChevronDown className="mr-2 h-4 w-4" />
                      Mostrar más
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Loan Request */}
            <Card className="bg-gradient-to-r from-red-800 to-red-700 text-white">
              <CardHeader>
                <CardTitle>Solicitar Préstamo</CardTitle>
                <CardDescription className="text-red-200">Obtén financiamiento para tus proyectos</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-red-200">Préstamo pre-aprobado</p>
                    <p className="text-2xl font-bold">Hasta $100,000.00</p>
                  </div>
                  <DollarSign className="h-10 w-10 text-red-300" />
                </div>
                <p className="text-sm text-red-200">Tasa de interés desde 12.5% anual. Plazos de 12 a 60 meses.</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-500" onClick={() => router.push("/prestamo")}>
                  Solicitar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

