"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Definición de países con sus códigos y banderas
const countries = [
  { code: "MX", name: "México", dialCode: "+52", flag: "🇲🇽" },
  { code: "US", name: "Estados Unidos", dialCode: "+1", flag: "🇺🇸" },
  { code: "ES", name: "España", dialCode: "+34", flag: "🇪🇸" },
  { code: "CO", name: "Colombia", dialCode: "+57", flag: "🇨🇴" },
  { code: "AR", name: "Argentina", dialCode: "+54", flag: "🇦🇷" },
  { code: "CL", name: "Chile", dialCode: "+56", flag: "🇨🇱" },
  { code: "PE", name: "Perú", dialCode: "+51", flag: "🇵🇪" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string) => void
  defaultCountry?: string
}

export default function PhoneInput({ value, onChange, defaultCountry = "MX" }: PhoneInputProps) {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.code === defaultCountry) || countries[0],
  )
  const [phoneNumber, setPhoneNumber] = useState("")

  // Actualizar el valor cuando cambia el país o el número
  useEffect(() => {
    // Si hay un valor existente, intentar parsearlo
    if (value && value !== selectedCountry.dialCode) {
      // Verificar si el valor comienza con algún código de país
      const countryCode = countries.find((c) => value.startsWith(c.dialCode))

      if (countryCode) {
        setSelectedCountry(countryCode)
        setPhoneNumber(value.substring(countryCode.dialCode.length))
      } else {
        // Si no coincide con ningún código de país, asumir que es solo el número
        setPhoneNumber(value)
      }
    } else {
      // Si no hay valor o es solo el código de país, establecer el número como vacío
      setPhoneNumber("")
    }
  }, [value])

  // Manejar cambios en el número de teléfono
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, "")
    setPhoneNumber(newPhoneNumber)
    onChange(selectedCountry.dialCode + newPhoneNumber)
  }

  // Manejar cambios en el país seleccionado
  const handleCountryChange = (countryCode: string) => {
    const newCountry = countries.find((c) => c.code === countryCode) || countries[0]
    setSelectedCountry(newCountry)
    onChange(newCountry.dialCode + phoneNumber)
  }

  return (
    <div className="flex">
      <Select value={selectedCountry.code} onValueChange={handleCountryChange}>
        <SelectTrigger className="w-[120px] border-r-0 rounded-r-none">
          <SelectValue>
            <div className="flex items-center">
              <span className="mr-2">{selectedCountry.flag}</span>
              <span>{selectedCountry.dialCode}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {countries.map((country) => (
            <SelectItem key={country.code} value={country.code}>
              <div className="flex items-center">
                <span className="mr-2">{country.flag}</span>
                <span>{country.name}</span>
                <span className="ml-auto text-gray-500">{country.dialCode}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="rounded-l-none"
        placeholder="Número de teléfono"
      />
    </div>
  )
}

