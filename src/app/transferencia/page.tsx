"use client"

import { useRouter } from "next/navigation"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MazeBankSidebar } from "@/components/ui/maze-bank-sidebar"

export default function TransferenciaPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full">
        <MazeBankSidebar />

        <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="space-y-2 text-center">
              <h2 className="text-3xl font-bold tracking-tight">Transferencia</h2>
              <p className="text-muted-foreground">Transfiere dinero a otra cuenta</p>
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

            <div className="space-y-4">
              <Button
                onClick={() => router.push("/transferencia/agregar-cuenta")}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-500"
              >
                <PlusCircle className="h-5 w-5" />
                Nueva cuenta
              </Button>

              <Button
                onClick={() => router.push("/transferencia/otra-persona")}
                variant="outline"
                className="w-full border-red-400 hover:bg-red-100 text-red-600"
              >
                Otra persona
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

