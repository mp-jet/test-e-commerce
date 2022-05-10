import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsDateString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  readonly firstName: string;
  
  @ApiProperty()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsDateString()
  readonly dateOfBirth: Date;

  @ApiProperty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsString()
  readonly password: string;
}
