import InventoryExitForm from './InventoryExitForm'
import { DateRangeFilter } from '@/components/dashboard/DateRangeFilter'

export default function InventoryExitPage() {
  return (
    <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-8">
      {/* Header con título y filtros */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
            </svg>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Registrar Salida de Inventario</h1>
            <p className="text-gray-600">Registrar salidas y movimientos del inventario</p>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-2">Información de la Salida</h2>
              <p className="text-gray-600">Completa los datos del paciente y tratamiento</p>
            </div>
            <InventoryExitForm />
          </div>
        </div>
        
        {/* Panel lateral con información útil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Información Útil</h3>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-medium text-blue-900 mb-2">🏥 Tipos de Tratamiento</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Consulta</li>
                  <li>• Inmunoterapia</li>
                  <li>• Vacunas Pediátricas</li>
                  <li>• Gammaglobulina</li>
                  <li>• Pruebas</li>
                  <li>• Medicamentos Extras</li>
                </ul>
              </div>
              
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <h4 className="font-medium text-green-900 mb-2">✅ Proceso</h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>1. Datos del paciente</li>
                  <li>2. Tipo de tratamiento</li>
                  <li>3. Productos utilizados</li>
                  <li>4. Observaciones</li>
                </ul>
              </div>
              
              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                <h4 className="font-medium text-orange-900 mb-2">⚠️ Importante</h4>
                <p className="text-sm text-orange-800">
                  Registra cualquier reacción del paciente para seguimiento médico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 