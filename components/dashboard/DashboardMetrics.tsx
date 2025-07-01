"use client"

import { useState } from 'react'
import { DollarSign, Package, AlertTriangle, Clock } from 'lucide-react'
import { StockAlertsModal } from './StockAlertsModal'
import type { ProductInventoryDto, ExpirationAlertDto } from '@/types/dashboard'

interface DashboardMetricsProps {
  totalInventoryValue: number
  totalUsedInventoryCost: number
  lowStockAlerts: ProductInventoryDto[]
  expirationAlerts: ExpirationAlertDto[]
}

const currency = new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' })

export function DashboardMetrics({ totalInventoryValue, totalUsedInventoryCost, lowStockAlerts, expirationAlerts }: DashboardMetricsProps) {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-8">
        <div className="bg-blue-600 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center min-h-[150px] animate-fade-in">
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/20 mb-3">
            <DollarSign className="w-10 h-10 text-white" />
          </div>
          <div className="text-white text-4xl font-extrabold leading-tight drop-shadow-sm text-center">
            {currency.format(totalInventoryValue)}
          </div>
          <div className="text-blue-100 text-lg font-semibold mt-2 text-center">Valor Total</div>
        </div>
        <div className="bg-green-500 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center min-h-[150px] animate-fade-in">
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/20 mb-3">
            <Package className="w-10 h-10 text-white" />
          </div>
          <div className="text-white text-4xl font-extrabold leading-tight drop-shadow-sm text-center">
            {currency.format(totalUsedInventoryCost)}
          </div>
          <div className="text-green-100 text-lg font-semibold mt-2 text-center">Inventario Utilizado</div>
        </div>
        <div
          className="bg-orange-500 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center min-h-[150px] hover:scale-105 transition-transform duration-200 animate-fade-in cursor-pointer"
          onClick={() => setModalOpen(true)}
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/20 mb-3">
            <AlertTriangle className="w-10 h-10 text-white" />
          </div>
          <div className="text-white text-4xl font-extrabold leading-tight drop-shadow-sm text-center">
            {lowStockAlerts.length}
          </div>
          <div className="text-orange-100 text-lg font-semibold mt-2 text-center">Alertas de Stock Bajo</div>
        </div>
        <div className="bg-purple-500 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center min-h-[150px] animate-fade-in">
          <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-white/20 mb-3">
            <Clock className="w-10 h-10 text-white" />
          </div>
          <div className="text-white text-4xl font-extrabold leading-tight drop-shadow-sm text-center">
            {expirationAlerts.length}
          </div>
          <div className="text-purple-100 text-lg font-semibold mt-2 text-center">Alertas de Vencimiento</div>
        </div>
      </div>
      <StockAlertsModal
        open={modalOpen}
        products={lowStockAlerts}
        onClose={() => setModalOpen(false)}
      />
    </>
  )
} 