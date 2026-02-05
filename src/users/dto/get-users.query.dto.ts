import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersQueryDto {
  @IsOptional()
  @ApiPropertyOptional({
    description: 'Page number.',
    example: 1,
    minimum: 1,
  })
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Items per page.',
    example: 50,
    minimum: 1,
    maximum: 200,
  })
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(1)
  @Max(200)
  limit?: number = 50;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by name.',
    example: 'John Doe',
  })
  @IsString()
  name?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by email.',
    example: 'john@example.com',
  })
  @IsEmail()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by phone number.',
    example: '+380501234567',
  })
  @IsString()
  phone?: string;
}
