import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/dtos/user/registerUserDto';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';
import { UserService } from './user.service';
import { Request } from 'express';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Create a user when registering' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  create(@Body() registerUser: RegisterUserDto) {
    return this._userService.create(registerUser);
  }

  @Get('all')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  findAll() {
    return this._userService.findAll();
  }

  @Get('')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get current logged in user' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  findById(@Req() req: Request) {
    return this._userService.findById(req.user['sub']);
  }

  @Patch(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update user info' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUser) {
    return this._userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  remove(@Param('id') id: string) {
    return this._userService.remove(id);
  }
}
