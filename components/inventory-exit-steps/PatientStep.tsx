'use client'

import { useFormContext } from 'react-hook-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { InventoryUsageInput } from '@/schemas/inventory-usage'

interface PatientStepProps {
  onNext: () => void;
}

export function PatientStep({ onNext }: PatientStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<InventoryUsageInput>()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Datos del Paciente</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="nombrePaciente">Nombre del Paciente</Label>
          <Input
            id="nombrePaciente"
            {...register('nombrePaciente')}
            placeholder="Ej: Juan Pérez"
            className="mt-1"
          />
          {errors.nombrePaciente && (
            <p className="text-red-600 text-xs mt-1">{errors.nombrePaciente.message}</p>
          )}
        </div>
        <Button onClick={onNext} className="w-full">
          Siguiente
        </Button>
      </CardContent>
    </Card>
  )
} 