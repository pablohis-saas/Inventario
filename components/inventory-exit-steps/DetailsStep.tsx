'use client'

import { useFormContext, useFieldArray } from 'react-hook-form'
import { InventoryUsageInput, InventoryUsageDetailInput } from '@/schemas/inventory-usage'
import { TipoTratamiento } from '@/types/inventory'
import { InmunoterapiaForm } from './details/InmunoterapiaForm'
import { PruebasForm } from './details/PruebasForm'
import { ConsultaForm } from './details/ConsultaForm'
import { GammaglobulinaForm } from './details/GammaglobulinaForm'
import { VacunasPediatricasForm } from './details/VacunasPediatricasForm'
import { MedicamentosExtrasForm } from './details/MedicamentosExtrasForm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function ItemsList({ fields, remove }: { fields: any[]; remove: (index: number) => void }) {
  if (fields.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-lg">Items Agregados</CardTitle>
          <div className="text-sm text-red-600">
            ⚠️ No hay items agregados aún
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center py-4">
            No hay items agregados aún. Selecciona productos de la lista de arriba.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="text-lg">Items Agregados ({fields.length})</CardTitle>
        <div className="text-sm text-green-600">
          ✅ {fields.length} item(s) agregado(s)
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
              <div className="flex-1">
                <p className="font-medium">{(field as InventoryUsageDetailInput).nombreProducto}</p>
                <p className="text-sm text-muted-foreground">
                  Cantidad: {(field as InventoryUsageDetailInput).cantidad}
                </p>
              </div>
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => remove(index)}
              >
                Eliminar
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const renderDetailForm = (tipo: TipoTratamiento | undefined, append: any, fields: any[]) => {
  switch (tipo) {
    case TipoTratamiento.INMUNOTERAPIA:
      return <InmunoterapiaForm append={append} fields={fields} />
    case TipoTratamiento.PRUEBAS:
      return <PruebasForm append={append} fields={fields} />
    case TipoTratamiento.CONSULTA:
      return <ConsultaForm append={append} fields={fields} />
    case TipoTratamiento.GAMMAGLOBULINA:
      return <GammaglobulinaForm append={append} fields={fields} />
    case TipoTratamiento.VACUNAS_PEDIATRICAS:
      return <VacunasPediatricasForm append={append} fields={fields} />
    case TipoTratamiento.MEDICAMENTOS_EXTRAS:
      return <MedicamentosExtrasForm append={append} fields={fields} />
    default:
      return (
        <div className="text-center text-red-600">
          <p>Error: Tipo de tratamiento no seleccionado o no válido.</p>
          <p>Por favor, regrese y seleccione una opción.</p>
        </div>
      )
  }
}

export function DetailsStep() {
  const { control, watch } = useFormContext<InventoryUsageInput>()
  const tipoTratamiento = watch('tipoTratamiento')
  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  return (
    <div className="space-y-4">
      {renderDetailForm(tipoTratamiento as TipoTratamiento | undefined, append, fields)}
      <ItemsList fields={fields} remove={remove} />
    </div>
  )
} 