import { Module } from '@nestjs/common';
import { InventoryExitController } from './inventory-exit.controller';
import { InventoryExitService } from './inventory-exit.service';
import { PrismaModule } from '../prisma/prisma.module';
import { InventoryEntryModule } from './inventory-entry/inventory-entry.module';
import { InventoryUsageModule } from './inventory-usage/inventory-usage.module';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PrismaService } from '@prisma-service/prisma.service';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly prisma: PrismaService,
    private readonly productService: ProductService
  ) {}

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Post()
  async create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Get('category/:categoryName')
  async findByCategory(@Param('categoryName') categoryName: string) {
    return this.productService.findByCategory(decodeURIComponent(categoryName));
  }
}

@Module({
  imports: [PrismaModule, InventoryEntryModule, InventoryUsageModule],
  controllers: [InventoryExitController, ProductsController],
  providers: [InventoryExitService, ProductService],
  exports: [InventoryExitService, ProductService],
})
export class InventoryModule {} 