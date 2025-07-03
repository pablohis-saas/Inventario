'use client'

import { useState, useRef } from 'react'
import { useForm, FormProvider, useFormContext, useWatch, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAction } from 'next-safe-action/hooks'
import { toast } from 'sonner'
import { inventoryUsageSchema, InventoryUsageInput, InventoryUsageDetailInput } from '@/schemas/inventory-usage'
import { processInventoryUsage } from '@/app/actions/inventory-usage'
import { PatientStep } from '@/components/inventory-exit-steps/PatientStep'
import { TreatmentTypeStep } from '@/components/inventory-exit-steps/TreatmentTypeStep'
import { DetailsStep } from '@/components/inventory-exit-steps/DetailsStep'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'

// Define los pasos del formulario
const steps = ['PATIENT_NAME', 'TREATMENT_TYPE', 'DETAILS', 'SUMMARY']

function ReactionForm() {
    const { register, control } = useFormContext<InventoryUsageInput>()
    const tuvoReaccion = useWatch({
        control,
        name: 'tuvoReaccion'
    })

    return (
        <div className="space-y-4">
             <div className="space-y-2">
                <Label>Observaciones Adicionales</Label>
                <Textarea {...register('observaciones')} placeholder="Anotaciones sobre el tratamiento o el paciente..." />
            </div>
            <div className="space-y-2">
                <Label>¿El paciente tuvo alguna reacción?</Label>
                 <Controller
                    name="tuvoReaccion"
                    control={control}
                    render={({ field }) => (
                        <RadioGroup
                            onValueChange={(value) => field.onChange(value === 'true')}
                            value={String(field.value)}
                            className="flex items-center"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="true" id="reaccion-si" />
                                <Label htmlFor="reaccion-si">Sí</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="false" id="reaccion-no" />
                                <Label htmlFor="reaccion-no">No</Label>
                            </div>
                        </RadioGroup>
                    )}
                />
            </div>
            {tuvoReaccion === true && (
                 <div className="space-y-2">
                    <Label>Descripción de la Reacción</Label>
                    <Textarea {...register('descripcionReaccion')} placeholder="Detalle la reacción observada..." />
                </div>
            )}
        </div>
    )
}

function SummaryStep({ 
    onBack, 
    isPending 
}: { 
    onBack: () => void, 
    isPending: boolean 
}) {
    const { control } = useFormContext<InventoryUsageInput>()
    const [nombrePaciente, items] = useWatch({
        control,
        name: ['nombrePaciente', 'items']
    })

    return (
        <div>
            <h3 className="text-lg font-semibold">Resumen y Reacciones</h3>
            <div className="p-4 my-4 border rounded-md bg-muted/50">
                <p><strong>Paciente:</strong> {nombrePaciente}</p>
                <p className="mt-2"><strong>Items aplicados:</strong></p>
                <ul className="pl-5 list-disc">
                    {(items || []).map((d: InventoryUsageDetailInput, i: number) => <li key={i}>{d.nombreProducto} - Cantidad: {d.cantidad}</li>)}
                </ul>
            </div>

            <ReactionForm />

            <div className="flex justify-between mt-8">
                <Button onClick={onBack} variant="outline" type="button" disabled={isPending}>Atrás</Button>
                <Button type="submit" disabled={isPending}>
                    {isPending ? 'Registrando...' : 'Registrar Salida'}
                </Button>
            </div>
        </div>
    )
}

export default function InventoryExitForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const errorRef = useRef<HTMLParagraphElement>(null)
  const [unexpectedError, setUnexpectedError] = useState<string | null>(null)
  const methods = useForm<InventoryUsageInput>({
    resolver: zodResolver(inventoryUsageSchema),
    mode: 'onSubmit',
    defaultValues: { 
      items: [],
      tuvoReaccion: false,
     },
  })

  const { execute, result, status } = useAction(processInventoryUsage, {
    onSuccess: (res) => {
        if (res.data?.success) {
            toast.success(res.data.success)
            methods.reset()
            setCurrentStep(0)
            setUnexpectedError(null)
        } else if (res.data?.failure) {
            toast.error(res.data.failure)
            setUnexpectedError(res.data.failure)
        }
    },
    onError: (error) => {
        toast.error('Ocurrió un error inesperado.')
        setUnexpectedError('Ocurrió un error inesperado. Intenta de nuevo o contacta soporte.')
        console.error('InventoryExitForm error:', error);
    }
  })

  const handleNext = async () => {
    let fieldsToValidate: (keyof InventoryUsageInput)[] = []
    if (steps[currentStep] === 'PATIENT_NAME') fieldsToValidate.push('nombrePaciente')
    if (steps[currentStep] === 'TREATMENT_TYPE') fieldsToValidate.push('tipoTratamiento')
    if (steps[currentStep] === 'DETAILS') fieldsToValidate.push('items')
    const isValid = await methods.trigger(fieldsToValidate)
    if (!isValid) {
      console.warn('Errores de validación:', methods.formState.errors)
    }
    if (isValid) setCurrentStep((prev) => prev + 1)
  }

  const handleBack = () => setCurrentStep((prev) => prev - 1)

  const onSubmit = async (data: InventoryUsageInput) => {
    if (!data.tipoTratamiento) {
      toast.error('Debes seleccionar un tipo de tratamiento antes de registrar la salida.')
      if (errorRef.current) errorRef.current.focus()
      setUnexpectedError('Debes seleccionar un tipo de tratamiento antes de registrar la salida.')
      return
    }
    setUnexpectedError(null)
    execute(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        {unexpectedError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded p-3 text-sm">
            {unexpectedError}
          </div>
        )}
        {Object.values(methods.formState.errors).length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded p-3 text-sm">
            {Object.values(methods.formState.errors).map((err: any, i) => err?.message && <div key={i}>{err.message}</div>)}
          </div>
        )}
        {steps[currentStep] === 'PATIENT_NAME' && <PatientStep onNext={handleNext} />}
        {steps[currentStep] === 'TREATMENT_TYPE' && <TreatmentTypeStep onNext={handleNext} onBack={handleBack} />}
        {steps[currentStep] === 'DETAILS' && (
          <div>
            <DetailsStep />
            {methods.formState.errors.items && (
              <div className="text-red-600 text-xs mt-2">{methods.formState.errors.items.message}</div>
            )}
            <div className="flex justify-between mt-4">
                <Button onClick={handleBack} variant="outline" type="button">Atrás</Button>
                <Button onClick={handleNext} type="button">Siguiente</Button>
            </div>
          </div>
        )}
        {steps[currentStep] === 'SUMMARY' && <SummaryStep onBack={handleBack} isPending={status === 'executing'} />}
        <p ref={errorRef} tabIndex={-1} className="sr-only text-red-600">Debes seleccionar un tipo de tratamiento antes de registrar la salida.</p>
      </form>
    </FormProvider>
  )
} 