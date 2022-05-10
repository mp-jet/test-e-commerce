import { Body, Controller, Get, HttpCode, Param, Post, Req, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/requestWithUser.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200 })
  async register(@Body() user: CreateUserDto): Promise<UserResponseDto> {
    return this.authService.register(user);
  }

  // @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Req() {user}: RequestWithUser, @Body() {email, password}: LoginDto) {
    return this.authService.login(email, password);
  }

  @Get('confirm-email/:activationToken')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Confirm user email and activate account' })
  @ApiResponse({ status: 200 })
  getProfile(@Param('activationToken') activationToken: string) {
    return this.authService.activate(activationToken);
  }

  @HttpCode(200)
  @Post('reset-password')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Reset user password' })
  @ApiResponse({ status: 200 })
  resetPassword(@Body() resetPassword: ResetPasswordDto) {
    return this.authService.resetPassword(resetPassword);
  }
}
