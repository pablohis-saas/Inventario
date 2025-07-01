import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNumber, IsOptional, IsString } from 'class-validator';

export class InventoryEntryDto {
  @ApiProperty()
  @IsUUID()
  productId: string = '';

  @ApiProperty()
  @IsUUID()
  sedeId: string = '';

  @ApiProperty()
  @IsUUID()
  userId: string = '';

  @ApiProperty()
  @IsNumber()
  quantity: number = 0;

  @ApiProperty()
  @IsNumber()
  unitCost: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  expiryDate?: string;

  @ApiProperty()
  @IsString()
  supplierName: string = '';

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  invoiceNumber?: string;
}

export class MovementDto {
  @ApiProperty()
  id: string = '';

  @ApiProperty()
  userId: string = '';

  @ApiProperty()
  sedeId: string = '';

  @ApiProperty()
  productId: string = '';

  @ApiProperty()
  type: string = '';

  @ApiProperty()
  quantity: number = 0;

  @ApiProperty()
  unitCost: number = 0;

  @ApiProperty()
  totalCost: number = 0;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  expiryDate?: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiProperty()
  createdAt: Date = new Date();
}

export class InventoryEntryResponse {
  @ApiProperty({ type: MovementDto })
  movement: MovementDto = new MovementDto();

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  supplierId?: string;

  @ApiProperty()
  updatedQuantity: number = 0;

  @ApiProperty()
  inventoryValue: number = 0;
} 