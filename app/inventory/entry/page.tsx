import InventoryEntryForm from '@/components/inventory-entry/InventoryEntryForm'
import { DateRangeFilter } from '@/components/dashboard/DateRangeFilter'

export default function InventoryEntryPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
      {/* Header con título y filtros */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registrar Entrada de Inventario</h1>
            <p className="text-gray-600">Agregar nuevos productos al inventario clínico</p>
          </div>
        </div>
        
        {/* Filtro de fechas para ver métricas relacionadas */}
        <DateRangeFilter />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario principal */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Información del Producto</h2>
              <p className="text-gray-600">Completa los datos del producto que deseas agregar</p>
            </div>
            <InventoryEntryForm />
          </div>
        </div>
        
        {/* Panel lateral con información útil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Útil</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">📋 Categorías Disponibles</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Alérgenos Alxoid</li>
                  <li>• Alérgenos</li>
                  <li>• Vacunas Pediátricas</li>
                  <li>• Medicamentos</li>
                  <li>• Gammaglobulina</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">✅ Consejos</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>• Verifica la fecha de caducidad</li>
                  <li>• Revisa el lote del producto</li>
                  <li>• Confirma el precio unitario</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">⚠️ Importante</h4>
                <p className="text-sm text-orange-800">
                  Los productos Alxoid requieren especificar ml por vial para el cálculo correcto de la cantidad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 