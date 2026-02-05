import { Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags('auth')
@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Generate JWT access token.' })
  @ApiResponse({ status: 201, description: 'Token generated.' })
  @Post('token')
  generateToken() {
    return this.authService.generateToken();
  }
}
