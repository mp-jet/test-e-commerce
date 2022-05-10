import { Body, Controller, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/category/dto/category.dto';
import { Category } from 'src/category/entities/category.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserResponseDto } from './dto/user-response.dto';
import { UsersService } from './users.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(
    private readonly userService: UsersService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({})
  @ApiResponse({})
  async getAllUsers() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({})
  @ApiResponse({})
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    const user = await this.userService.findOne({ id });
    if (user) {
      return user;
    }
    throw new NotFoundException('User with this id does not exist');
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({ summary: 'Add user pereference'})
  @ApiResponse({})
  @ApiBody({ type: [CategoryDto] })
  async addUserPreference(
    @Param('id', ParseIntPipe) id: number,
    @Body() categories: CategoryDto[]
  ): Promise<UserResponseDto> {
    return this.userService.addUserPreference(id, categories);
  }
}
