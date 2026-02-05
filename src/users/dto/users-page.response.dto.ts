import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDto } from './user.response.dto';

export class UsersPageResponseDto {
  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 50 })
  limit: number;

  @ApiProperty({ example: 2000000 })
  total: number;

  @ApiProperty({ example: 40000 })
  pages: number;

  @ApiProperty({ type: [UserResponseDto] })
  items: UserResponseDto[];
}

