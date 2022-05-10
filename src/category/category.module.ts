import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CategoryController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [CategoryService],
  providers: [CategoryService],
  controllers: [CategoryController]
})
export class CategoryModule {}
