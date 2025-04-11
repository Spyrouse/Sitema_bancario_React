"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import UserForm from "@/components/register/user-form"
import BankForm from "@/components/register/bank-form"
import CredentialsForm from "@/components/register/credentials-form"
import SuccessModal from "@/components/register/success-modal"

type UserData = {
  nombre: string
  email: string
  telefono: string
  calle: string
  numero: string
  delegacion: string
  ciudad: string
}

type BankData = {
  numeroTarjeta: string
  fechaVencimiento: string
  cvv: string
  tipoCuenta: string
}

type CredentialsData = {
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const [userData, setUserData] = useState<UserData>({
    nombre: "",
    email: "",
    telefono: "",
    calle: "",
    numero: "",
    delegacion: "",
    ciudad: "",
  })

  const [bankData, setBankData] = useState<BankData>({
    numeroTarjeta: "",
    fechaVencimiento: "",
    cvv: "",
    tipoCuenta: "Débito",
  })

  const [credentialsData, setCredentialsData] = useState<CredentialsData>({
    password: "",
    confirmPassword: "",
  })

  const handleUserSubmit = (data: UserData) => {
    setUserData(data)
    setStep(2)
  }

  const handleBankSubmit = (data: BankData) => {
    setBankData(data)
    setStep(3)
  }

  const handleCredentialsSubmit = (data: CredentialsData) => {
    setCredentialsData(data)
    // Aquí normalmente enviarías los datos al servidor
    setShowSuccess(true)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    router.push("/components")
  }

  return (
    <div className="flex min-h-screen w-full">
     
      {/* Apartado del lado izquierdo */}
        <div className="hidden w-1/2 flex-col items-center justify-center bg-gradient-to-b from-red-500 to-red-800 lg:flex">
          <div className="flex flex-col items-center justify-center space-y-6 px-8 text-center">
            <div className="relative h-32 w-32">
                <Image src="/assets/logo.jpg" alt="Maze Bank Logo"  width={500} height={500} className="object-contain" />
            </div>
            <h1 className="text-4xl font-bold text-white">Maze Bank</h1>
            <p className="text-xl text-white/80">Consuta tu estado de cuenta a tu alcance</p>
          </div>
        </div>

      {/* Lado derecho - Formulario */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-8">
            {step === 1 && "Registro - Datos Personales"}
            {step === 2 && "Registro - Datos Bancarios"}
            {step === 3 && "Registro - Credenciales"}
          </h2>

          {step === 1 && <UserForm onSubmit={handleUserSubmit} initialData={userData} />}
          {step === 2 && <BankForm onSubmit={handleBankSubmit} initialData={bankData} />}
          {step === 3 && <CredentialsForm onSubmit={handleCredentialsSubmit} initialData={credentialsData} />}

          {showSuccess && <SuccessModal onClose={handleSuccessClose} />}
        </div>
      </div>
    </div>
  )
}

