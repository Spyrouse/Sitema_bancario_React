"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type BankData = {
  numeroTarjeta: string
  fechaVencimiento: string
  cvv: string
  tipoCuenta: string
}

interface BankFormProps {
  onSubmit: (data: BankData) => void
  initialData: BankData
}

export default function BankForm({ onSubmit, initialData }: BankFormProps) {
  const [formData, setFormData] = useState<BankData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof BankData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    let formattedValue = value

    // Formatear número de tarjeta
    if (name === "numeroTarjeta") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 16) {
        formattedValue = formattedValue.slice(0, 16)
      }
      // Agregar espacios cada 4 dígitos para visualización
      formattedValue = formattedValue.replace(/(\d{4})(?=\d)/g, "$1 ").trim()
    }

    // Formatear fecha de vencimiento (MM/YY)
    if (name === "fechaVencimiento") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 4) {
        formattedValue = formattedValue.slice(0, 4)
      }
      if (formattedValue.length > 2) {
        formattedValue = formattedValue.slice(0, 2) + "/" + formattedValue.slice(2)
      }
    }

    // Formatear CVV (3 dígitos)
    if (name === "cvv") {
      formattedValue = value.replace(/\D/g, "")
      if (formattedValue.length > 3) {
        formattedValue = formattedValue.slice(0, 3)
      }
    }

    setFormData((prev) => ({ ...prev, [name]: formattedValue }))

    // Limpiar error cuando el usuario escribe
    if (errors[name as keyof BankData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, tipoCuenta: value }))
    if (errors.tipoCuenta) {
      setErrors((prev) => ({ ...prev, tipoCuenta: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof BankData, string>> = {}

    // Validar número de tarjeta (16 dígitos)
    const cardNumber = formData.numeroTarjeta.replace(/\s/g, "")
    if (!cardNumber) {
      newErrors.numeroTarjeta = "El número de tarjeta es requerido"
    } else if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
      newErrors.numeroTarjeta = "El número de tarjeta debe tener 16 dígitos"
    }

    // Validar fecha de vencimiento (MM/YY)
    if (!formData.fechaVencimiento) {
      newErrors.fechaVencimiento = "La fecha de vencimiento es requerida"
    } else {
      const [month, year] = formData.fechaVencimiento.split("/")
      const currentYear = new Date().getFullYear() % 100 // Obtener últimos 2 dígitos del año actual
      const currentMonth = new Date().getMonth() + 1 // Meses en JS son 0-11

      if (!month || !year || month.length !== 2 || year.length !== 2) {
        newErrors.fechaVencimiento = "Formato inválido (MM/YY)"
      } else {
        const monthNum = Number.parseInt(month, 10)
        const yearNum = Number.parseInt(year, 10)

        if (monthNum < 1 || monthNum > 12) {
          newErrors.fechaVencimiento = "Mes inválido"
        } else if (yearNum < currentYear || (yearNum === currentYear && monthNum < currentMonth)) {
          newErrors.fechaVencimiento = "La tarjeta ha expirado"
        }
      }
    }

    // Validar CVV (3 dígitos)
    if (!formData.cvv) {
      newErrors.cvv = "El CVV es requerido"
    } else if (formData.cvv.length !== 3 || !/^\d+$/.test(formData.cvv)) {
      newErrors.cvv = "El CVV debe tener 3 dígitos"
    }

    // Validar tipo de cuenta
    if (!formData.tipoCuenta) {
      newErrors.tipoCuenta = "El tipo de cuenta es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Determinar el tipo de tarjeta basado en el primer dígito
  const getCardType = () => {
    const firstDigit = formData.numeroTarjeta.replace(/\s/g, "").charAt(0)
    if (firstDigit === "4") return "Maze Bronce"
    if (firstDigit === "5") return "Maze Platinum"
    if (firstDigit === "3") return "Maze Clasic"
    if (firstDigit === "6") return "Maze Gold"
    return "Nómina"
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Tarjeta visual */}
      <div className="relative w-full h-56 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white shadow-lg overflow-hidden">
        <div className="absolute top-4 right-4 text-lg font-medium">{getCardType()}</div>
        <div className="mt-16 text-2xl tracking-wider">{formData.numeroTarjeta || "•••• •••• •••• ••••"}</div>
        <div className="mt-4 flex justify-between">
          <div>
            <div className="text-xs opacity-75">Válida hasta</div>
            <div>{formData.fechaVencimiento || "MM/YY"}</div>
          </div>
          <div>
            <div className="text-xs opacity-75">CVV</div>
            <div>{formData.cvv ? "•••" : "•••"}</div>
          </div>
        </div>
        <div className="absolute bottom-4 left-6 text-lg font-medium">VISA</div>
      </div>

      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="numeroTarjeta">Número de Tarjeta</Label>
          <Input
            id="numeroTarjeta"
            name="numeroTarjeta"
            value={formData.numeroTarjeta}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
          />
          {errors.numeroTarjeta && <p className="text-sm text-red-500">{errors.numeroTarjeta}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fechaVencimiento">Fecha de Vencimiento</Label>
            <Input
              id="fechaVencimiento"
              name="fechaVencimiento"
              value={formData.fechaVencimiento}
              onChange={handleChange}
              placeholder="MM/YY"
            />
            {errors.fechaVencimiento && <p className="text-sm text-red-500">{errors.fechaVencimiento}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="cvv">CVV</Label>
            <Input id="cvv" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" type="password" />
            {errors.cvv && <p className="text-sm text-red-500">{errors.cvv}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tipoCuenta">Tipo de Cuenta</Label>
          <Select value={formData.tipoCuenta} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tipo de cuenta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Débito">Débito</SelectItem>
              <SelectItem value="Crédito">Crédito</SelectItem>
              <SelectItem value="Nómina">Nómina</SelectItem>
            </SelectContent>
          </Select>
          {errors.tipoCuenta && <p className="text-sm text-red-500">{errors.tipoCuenta}</p>}
        </div>
      </Card>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
        Iniciar sesión
      </Button>
      {/*
      <Button type="submit" className="w-full">
        Continuar
      </Button>
      */}
    </form>
  )
}

