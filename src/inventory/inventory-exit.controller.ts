import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InventoryExitService } from './inventory-exit.service';
import { InventoryExitDto } from './dto/inventory-exit.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Inventory')
@Controller('inventory')
@UseGuards(JwtAuthGuard, RolesGuard)
export class InventoryExitController {
  constructor(private readonly inventoryExitService: InventoryExitService) {}

  @Post('exit')
  @Roles(UserRole.NURSE, UserRole.DOCTOR)
  @ApiOperation({ summary: 'Process inventory exit after medical consultation' })
  @ApiResponse({
    status: 201,
    description: 'Inventory exit processed successfully',
  })
  async processInventoryExit(@Body() dto: InventoryExitDto) {
    return this.inventoryExitService.processInventoryExit(dto);
  }
} 