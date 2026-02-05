import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiPropertyOptional({
    description: 'User full name.',
    example: 'John Doe',
    minLength: 2,
  })
  @IsOptional()
  @IsString()
  @MinLength(2)
  name?: string;

  @ApiPropertyOptional({
    description: 'User email.',
    example: 'john@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'User phone number.',
    example: '+380501234567',
  })
  @IsOptional()
  @IsString()
  @Matches(/^[+0-9\-() ]{6,20}$/)
  phone?: string;

  @ApiPropertyOptional({
    description: 'User birth date.',
    example: '1990-01-01',
  })
  @IsOptional()
  @IsDateString()
  birthDate?: string;
}
