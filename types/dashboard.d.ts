import { ReactNode } from 'react';

export interface ProductInventoryDto {
    name: string;
    quantity: number;
    unitCost: number;
    totalValue: number;
    category?: string;
}

export interface CategoryInventoryDto {
    category: string;
    totalProducts: number;
    totalValue: number;
}

export interface ExpirationAlertDto {
    productName: string;
    batchNumber: string;
    expiryDate: Date;
    quantity: number;
}

export interface MovementDto {
    id: string;
    productName: string;
    type: string;
    quantity: number;
    createdAt: Date;
}

export interface MostUsedProductDto {
    productName: string;
    totalExits: number;
    totalUsage: number;
}

export interface ImmobilizedInventoryDto {
    productName: string;
    quantity: number;
    value: number;
    lastMovement: Date;
    daysWithoutMovement: number;
}

export interface DashboardResponseDto {
    inventory: ProductInventoryDto[];
    inventoryByCategory: CategoryInventoryDto[];
    totalInventoryValue: number;
    totalExits: number;
    totalUsage: number;
    totalUsedInventoryCost: number;
    lowStockAlerts: ProductInventoryDto[];
    expirationAlerts: ExpirationAlertDto[];
    mostUsedProducts: MostUsedProductDto[];
    recentMovements: MovementDto[];
    immobilizedInventory: ImmobilizedInventoryDto[];
    totalProductsByCategory: CategoryInventoryDto[];
}

export interface DashboardMetrics {
    totalInventoryValue: number;
    inventoryUsed: number;
    lowStockAlerts: number;
    expirationAlerts: number;
}

export interface DashboardCardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    variant?: 'default' | 'warning' | 'danger';
}

export interface DashboardPageProps {
    searchParams: {
        sedeId?: string;
        from?: string;
        to?: string;
    };
}
