"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

interface SuccessModalProps {
  onClose: () => void
}

export default function SuccessModal({ onClose }: SuccessModalProps) {
  const router = useRouter()

  const handleAccept = () => {
    // Primero ejecutamos la función onClose original
    onClose()
    // Luego redirigimos a la página principal
    router.push("/")
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-500" />
          <h2 className="text-2xl font-bold">¡Registro Exitoso!</h2>
          <p className="text-gray-600">
            Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión con tus credenciales.
          </p>
          <Button onClick={handleAccept} className="w-full bg-red-600 hover:bg-red-700">
            Aceptar
          </Button>
        </div>
      </Card>
    </div>
  )
}

