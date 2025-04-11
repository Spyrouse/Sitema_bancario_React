"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import PhoneInput from "@/components/ui/phone-input"

type UserData = {
  nombre: string
  email: string
  telefono: string
  calle: string
  numero: string
  delegacion: string
  ciudad: string
}

interface UserFormProps {
  onSubmit: (data: UserData) => void
  initialData: UserData
}

export default function UserForm({ onSubmit, initialData }: UserFormProps) {
  const [formData, setFormData] = useState<UserData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof UserData, string>>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar error cuando el usuario escribe
    if (errors[name as keyof UserData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({ ...prev, telefono: value }))
    if (errors.telefono) {
      setErrors((prev) => ({ ...prev, telefono: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof UserData, string>> = {}

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido"
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido"
    }
    if (!formData.telefono) newErrors.telefono = "El teléfono es requerido"
    if (!formData.calle.trim()) newErrors.calle = "La calle es requerida"
    if (!formData.numero.trim()) newErrors.numero = "El número es requerido"
    if (!formData.delegacion.trim()) newErrors.delegacion = "La delegación es requerida"
    if (!formData.ciudad.trim()) newErrors.ciudad = "La ciudad es requerida"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="nombre">Nombre</Label>
          <Input
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Ingresa tu nombre completo"
          />
          {errors.nombre && <p className="text-sm text-red-500">{errors.nombre}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="ejemplo@correo.com"
          />
          {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="telefono">Teléfono</Label>
          <PhoneInput value={formData.telefono} onChange={handlePhoneChange} defaultCountry="MX" />
          {errors.telefono && <p className="text-sm text-red-500">{errors.telefono}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="calle">Calle</Label>
            <Input
              id="calle"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              placeholder="Nombre de la calle"
            />
            {errors.calle && <p className="text-sm text-red-500">{errors.calle}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="numero">Número</Label>
            <Input
              id="numero"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
              placeholder="Número exterior"
            />
            {errors.numero && <p className="text-sm text-red-500">{errors.numero}</p>}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="delegacion">Delegación</Label>
            <Input
              id="delegacion"
              name="delegacion"
              value={formData.delegacion}
              onChange={handleChange}
              placeholder="Delegación o municipio"
            />
            {errors.delegacion && <p className="text-sm text-red-500">{errors.delegacion}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ciudad">Ciudad</Label>
            <Input id="ciudad" name="ciudad" value={formData.ciudad} onChange={handleChange} placeholder="Ciudad" />
            {errors.ciudad && <p className="text-sm text-red-500">{errors.ciudad}</p>}
          </div>
        </div>
      </Card>

      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
          Continuar
      </Button>
      {/*
      <Button type="submit" className="w-full">
        Continuar
      </Button>*/}
    </form>
  )
}

