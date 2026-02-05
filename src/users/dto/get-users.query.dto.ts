import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetUsersQueryDto {
  @IsOptional()
  @ApiProperty({
    description: 'Page number.',
    example: 1,
    minimum: 1,
    required: true,
  })
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @ApiProperty({
    description: 'Items per page.',
    example: 50,
    minimum: 1,
    maximum: 1000,
    required: true,
  })
  @Transform(({ value }) => parseInt(String(value), 10))
  @IsInt()
  @Min(1)
  @Max(1000)
  limit?: number = 50;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by partial name.',
  })
  @IsString()
  name?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by partial email.',
  })
  @IsString()
  email?: string;

  @IsOptional()
  @ApiPropertyOptional({
    description: 'Filter by partial phone number.',
  })
  @IsString()
  phone?: string;
}
