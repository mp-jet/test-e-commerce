import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsBoolean, IsDateString, IsArray } from 'class-validator';
import { CategoryDto } from 'src/category/dto/category.dto';
import { CreateUserDto } from './create-user.dto';

export class UserDto extends CreateUserDto {
  @ApiProperty()
  @IsInt()
  readonly id: number;

  @ApiProperty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsBoolean()
  readonly active: boolean;

  @ApiProperty()
  @IsString()
  readonly activationToken: string;

  @ApiProperty({type: [CategoryDto]})
  @IsArray()
  preference: CategoryDto[];

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;
}
