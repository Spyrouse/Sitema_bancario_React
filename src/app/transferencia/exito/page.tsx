"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MazeBankSidebar } from "@/components/ui/maze-bank-sidebar"

export default function ExitoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const referencia = searchParams.get("referencia") || ""

  return (
    <div className="min-h-screen">
      <div className="flex min-h-screen w-full">
        <MazeBankSidebar />

        <div className="flex w-full flex-col items-center justify-center px-4 lg:w-1/2 lg:px-8 bg-white">
          <div className="mx-auto w-full max-w-md space-y-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-red-800 to-red-700 text-white rounded-t-lg pb-2">
                <div className="flex justify-center mt-4">
                  <div className="bg-white rounded-full p-2">
                    <CheckCircle className="h-16 w-16 text-green-500" />
                  </div>
                </div>
                <CardTitle className="text-2xl mt-4">¡Transacción exitosa!</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <p className="text-muted-foreground">Tu transferencia se ha realizado correctamente.</p>
                <p className="font-medium">Número de referencia: {referencia}</p>
                <Button onClick={() => router.push("/dashboard")} className="w-full bg-red-600 hover:bg-red-500">
                  Aceptar
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

