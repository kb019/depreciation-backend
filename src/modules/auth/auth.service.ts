import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from 'src/dtos/user/signInDto';
import { ConfigService } from '@nestjs/config';
import { RegisterUserDto } from 'src/dtos/user/registerUserDto';
import * as argon2 from 'argon2';
import { UpdateUser } from 'src/dtos/user/updateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private _usersService: UserService,
    private _jwtService: JwtService,
    private _configService: ConfigService,
  ) {}
  async signUp(registerUserDto: RegisterUserDto): Promise<any> {
    // Check if user exists
    const userExists = await this._usersService.findByEmail(
      registerUserDto.email,
    );
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(registerUserDto.password);
    const newUser = await this._usersService.create({
      ...registerUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: SignInDto) {
    // Check if user exists
    const user = await this._usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Password is incorrect');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async forgotPassword(data: SignInDto) {
    const user = await this._usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException('User does not exist');
    const hash = await this.hashData(data.password);
    await this._usersService.update(user.id, { password: hash });
  }

  async updateUser(id: string, updateUserDto: UpdateUser) {
    return this._usersService.update(id, updateUserDto);
  }

  async logout(userId: string) {
    return this._usersService.update(userId, { refreshToken: null });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this._usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getTokens(userId: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this._jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this._configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '1h',
        },
      ),
      this._jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this._configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this._usersService.findById(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }
}
