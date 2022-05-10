import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { MinLength } from 'class-validator';
import { Category } from 'src/category/entities/category.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({readOnly: true})
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({
    unique: true,
    nullable: false,
  })
  email: string;

  @ApiProperty()
  @MinLength(6)
  @Exclude({ toPlainOnly: true })
  @Column({
    nullable: false,
  })
  password: string;
  
  @ApiProperty()
  @Column({
    nullable: true,
  })
  firstName: string;

  @ApiProperty()
  @Column({
    nullable: true,
  })
  lastName: string;

  @ApiProperty()
  @Column()
  dateOfBirth: Date;

  @ApiProperty()
  @Column({ default: false })
  active: boolean;

  @ApiProperty({ nullable: true })
  @Exclude({ toPlainOnly: true })
  @Column({
    unique: true,
    nullable: true,
  })
  activationToken: string;

  @ApiProperty()
  @ManyToMany(() => Category)
  @JoinTable()
  preference: Category[];

  @ApiProperty()
  @Column()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @Column()
  @UpdateDateColumn()
  updatedAt: string;
}
