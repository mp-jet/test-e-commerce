import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsDateString, IsEmail, IsInt, IsString } from 'class-validator';
import { CategoryDto } from 'src/category/dto/category.dto';

export class UserResponseDto {
  @ApiProperty()
  @IsInt()
  readonly id: number;

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
  @IsBoolean()
  readonly active: boolean;

  @ApiProperty({type: [CategoryDto]})
  @IsArray()
  preference: CategoryDto[];
}
