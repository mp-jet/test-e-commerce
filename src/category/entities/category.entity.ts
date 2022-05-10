import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @ApiProperty({readOnly: true})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
  })
  name: string;

  @ApiProperty()
  @Column()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
