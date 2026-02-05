import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersQueryDto } from './dto/get-users.query.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UserResponseDto } from './dto/user.response.dto';
import { UsersPageResponseDto } from './dto/users-page.response.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a user (or randomize missing fields).' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User created.',
    type: UserResponseDto,
  })
  @Post('add-user')
  addUser(@Body() dto: CreateUserDto) {
    return this.userService.addUser(dto);
  }

  @ApiOperation({
    summary: 'Get users with pagination and optional filters.',
  })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'email', required: false, type: String })
  @ApiQuery({ name: 'phone', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'Users list.',
    type: UsersPageResponseDto,
  })
  @Get('get-users')
  getUsers(@Query() query: GetUsersQueryDto) {
    return this.userService.getUsers(query);
  }

  @ApiOperation({ summary: 'Get user by id.' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'User found.',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @Get('get-user/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }
}
