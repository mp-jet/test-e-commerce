import { HttpException, HttpStatus, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserResponseDto } from 'src/users/dto/user-response.dto';
import { UsersService } from 'src/users/users.service';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserResponseDto | null> {   
    const user = await this.usersService.findOne({ email });

    if (!user.active) {
      throw new HttpException('Please activate user profile', HttpStatus.FORBIDDEN)
    }

    const isMatch = await bcrypt.compare(password, user?.password)
    
    if (isMatch ) {
      const {password, ...result} = user;
      return result;
    }
    
    throw new UnauthorizedException();
  }

  async register(user: CreateUserDto): Promise<UserResponseDto> {
    return this.usersService.create(user)
  }

  async login(email: string, password: string) {
    const user = await this.validateUser(email, password)
    const payload = { email: user.email, id: user.id };

    return {
      access_token: this.jwtService.sign(payload)
    };
  }

  async activate(activationToken: string): Promise<void> {
    const user = await this.usersService.findOne({ activationToken });

    if (user) {
      await this.usersService.activate(user);
    } else {
      throw new NotFoundException()
    }
  }

  async resetPassword({oldPassword, newPassword, email}: ResetPasswordDto) {
    const user = await this.usersService.findOne({ email });
    const isMatch = await bcrypt.compare(oldPassword, user?.password)   
    
    if (isMatch) {
      return await this.usersService.changePassword(user.id, newPassword)
    }

    throw new NotAcceptableException('Wrong old password')
  }
}
