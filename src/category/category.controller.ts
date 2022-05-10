import { Body, Controller, Get, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService
  ) {}

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({})
  async getAllCategories(): Promise<CategoryDto[]> {
    return this.categoryService.findAll();
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: '' })
  @ApiResponse({})
  async crateCategories(@Body() category: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoryService.create(category);
  }
}
