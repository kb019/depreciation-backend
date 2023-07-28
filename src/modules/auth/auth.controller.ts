import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/dtos/user/registerUserDto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { SignInDto } from 'src/dtos/user/signInDto';
import { Public } from 'src/auth/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { AccessTokenGuard } from 'src/guards/accessToken.guard';
import { RefreshTokenGuard } from 'src/guards/refreshToken.guard';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';

//https://www.elvisduru.com/blog/nestjs-jwt-authentication-refresh-token
@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'User Registration' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Post('signup')
  signup(@Body() registerUser: RegisterUserDto) {
    return this._authService.signUp(registerUser);
  }

  @Public()
  @HttpCode(200)
  @ApiOperation({ summary: 'User Sign In' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Post('signin')
  signin(@Body() data: SignInDto) {
    return this._authService.signIn(data);
  }

  @Public()
  @Post('forgotPassword')
  @HttpCode(200)
  @ApiOperation({ summary: 'Forgot Password' })
  @ApiResponse({ status: 200, description: 'OK' })
  forgotPassword(@Body() data: SignInDto) {
    return this._authService.forgotPassword(data);
  }

  @HttpCode(200)
  @ApiOperation({ summary: 'User Log Out' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get('logout')
  logout(@Req() req: Request) {
    this._authService.logout(req.user['sub']);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    const refreshToken = req.user['refreshToken'];
    return this._authService.refreshTokens(userId, refreshToken);
  }

  @Post('update')
  updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUser) {
    const userId = req.user['sub'];
    return this._authService.updateUser(userId, updateUserDto);
  }
}
