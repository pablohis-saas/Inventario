import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { InventoryExitDto, ProductUsageDto } from './dto/inventory-exit.dto';
import { UserRole } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class InventoryExitService {
  constructor(private prisma: PrismaService) {}

  async processInventoryExit(dto: InventoryExitDto) {
    // Simulación: usuario con rol NURSE (ajusta según tu lógica real de autenticación)
    const user = { id: dto.userId, role: UserRole.NURSE };
    if (!(user.role === 'NURSE' || user.role === 'DOCTOR')) {
      throw new BadRequestException('Only nurses and doctors can process inventory exits');
    }

    const sede = await this.prisma.sede.findUnique({
      where: { id: dto.sedeId },
    });

    if (!sede) {
      throw new NotFoundException('Sede not found');
    }

    const productsUsed: ProductUsageDto[] = Array.isArray(dto.productsUsed) ? dto.productsUsed : [];

    for (const usage of productsUsed) {
      if (!usage || !usage.productId) continue;
      const product = await this.prisma.product.findUnique({
        where: { id: usage.productId },
        include: { stocks: { where: { sedeId: dto.sedeId } } },
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${usage.productId} not found`);
      }

      const availableStock = product.stocks.find(stock => {
        const stockQty = stock.quantity instanceof Decimal ? stock.quantity.toNumber() : Number(stock.quantity);
        return stockQty >= usage.quantity;
      });
      
      if (!availableStock) {
        const totalAvailable = product.stocks.reduce((sum, stock) => {
          const stockQty = stock.quantity instanceof Decimal ? stock.quantity.toNumber() : Number(stock.quantity);
          return sum + stockQty;
        }, 0);
        throw new BadRequestException(`Insufficient stock for product ${product.name}. Available: ${totalAvailable}, Requested: ${usage.quantity}`);
      }

      const newQuantity = (availableStock.quantity instanceof Decimal ? availableStock.quantity.toNumber() : Number(availableStock.quantity)) - usage.quantity;
      await this.prisma.stockBySede.update({
        where: { id: availableStock.id },
        data: { quantity: newQuantity },
      });
      await this.prisma.movement.create({
        data: {
          userId: user.id,
          sedeId: dto.sedeId,
          productId: usage.productId,
          quantity: usage.quantity,
          unitCost: 0, // Ajustar si tienes el costo unitario disponible
          totalCost: 0, // Ajustar si tienes el costo total disponible
          type: 'EXIT',
        },
      });
    }

    return { success: true };
  }
} 