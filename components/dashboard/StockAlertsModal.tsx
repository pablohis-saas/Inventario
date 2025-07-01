"use client"

interface Product {
  name: string
  quantity: number
  category?: string
}

interface StockAlertsModalProps {
  products: Product[]
  open: boolean
  onClose: () => void
}

export function StockAlertsModal({ products, open, onClose }: StockAlertsModalProps) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl p-0 max-w-lg w-full max-h-[80vh] flex flex-col">
        {/* Header sticky */}
        <div className="sticky top-0 z-10 bg-white rounded-t-2xl px-8 pt-8 pb-4 flex items-center justify-between border-b">
          <h2 className="text-xl font-bold text-gray-900">Productos con stock bajo</h2>
          <button
            className="text-gray-400 hover:text-gray-700 text-2xl font-bold ml-4"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>
        {/* Contenido scrollable */}
        <div className="overflow-y-auto px-8 pb-8" style={{ maxHeight: 'calc(80vh - 64px)' }}>
          {products.length === 0 ? (
            <div className="text-gray-500 text-center">No hay productos con stock bajo.</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-2 text-left">Producto</th>
                  <th className="py-2 text-right">Cantidad</th>
                  <th className="py-2 text-right">Categoría</th>
                </tr>
              </thead>
              <tbody>
                {products.map((prod, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="py-2 font-medium text-gray-900">{prod.name}</td>
                    <td className="py-2 text-right">{prod.quantity}</td>
                    <td className="py-2 text-right">{prod.category || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
} 