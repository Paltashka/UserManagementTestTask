import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '64b9f2d5c2b1a5d2a3b4c5d6' })
  _id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john@example.com' })
  email: string;

  @ApiProperty({ example: '+380501234567' })
  phone: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  birthDate: Date;
}

