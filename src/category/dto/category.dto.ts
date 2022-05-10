import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, IsString } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class CategoryDto extends CreateCategoryDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  @IsDateString()
  createdAt: string;

  @ApiProperty()
  @IsDateString()
  updatedAt: string;
}
