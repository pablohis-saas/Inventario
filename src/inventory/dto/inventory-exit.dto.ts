import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsEnum, IsArray, ValidateNested, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export enum UnitType {
  ML = 'ML',
  PIECE = 'PIECE',
  UNIT = 'UNIT'
}

export enum TreatmentType {
  GLICERINADO = 'GLICERINADO',
  ALXOID = 'ALXOID',
  SUBLINGUAL = 'SUBLINGUAL',
  SIMPLE = 'SIMPLE',
  ALLERGY = 'ALLERGY',
  CONSULTATION = 'CONSULTATION'
}

export enum Subtype {
  POR_UNIDAD = 'Por Unidad',
  EN_FRASCO = 'En Frasco'
}

export class ProductUsageDto {
  @ApiProperty()
  @IsUUID()
  productId: string = '';

  @ApiProperty()
  @IsString()
  productName: string = '';

  @ApiProperty()
  @IsNumber()
  quantity: number = 0;

  @ApiProperty({ enum: UnitType })
  @IsEnum(UnitType)
  unitType: UnitType = UnitType.UNIT;
}

export class InventoryExitDto {
  @ApiProperty()
  @IsString()
  productName: string = '';

  @ApiProperty()
  @IsNumber()
  quantity: number = 0;

  @ApiProperty({ enum: UnitType })
  @IsEnum(UnitType)
  unitType: UnitType = UnitType.UNIT;

  @ApiProperty()
  @IsUUID()
  userId: string = '';

  @ApiProperty()
  @IsUUID()
  sedeId: string = '';

  @ApiProperty({ enum: TreatmentType })
  @IsEnum(TreatmentType)
  treatmentType: TreatmentType = TreatmentType.CONSULTATION;

  @ApiProperty({ enum: Subtype, required: false })
  @IsOptional()
  @IsEnum(Subtype)
  subtype?: Subtype;

  @ApiProperty({ type: [ProductUsageDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductUsageDto)
  productsUsed: ProductUsageDto[] = [];
} 