import { Catch, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';

import { MailService } from 'src/mail/mail.service';
import { Category } from 'src/category/entities/category.entity';

import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';

import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly mailService: MailService,
  ) {}

  private encryptPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    return bcrypt.hash(password, saltOrRounds);
  }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const userEntity = new User();

    userEntity.firstName = createUserDto.firstName;
    userEntity.lastName = createUserDto.lastName;
    userEntity.email = createUserDto.email;
    userEntity.password = await this.encryptPassword(createUserDto.password);
    userEntity.dateOfBirth = createUserDto.dateOfBirth;
    userEntity.active = false;
    userEntity.activationToken = uuid();
      
    const user = await this.usersRepository.save(userEntity);
    const {password, activationToken, ...result} = user;

    await this.mailService.sendUserConfirmation(user);

    return result;
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      where: { active: true },
      relations: ['preference'],
    });
  }

  findOne(param: Partial<User>): Promise<User> {
    return this.usersRepository.findOne({ where: param });
  }


  async addUserPreference(id: number, category: Category[]): Promise<User> {
    const user = await this.usersRepository.findOne({ where: {id, active: true} });
    
    if (!user) {
      throw new NotFoundException('User not found or not active', )
    }

    return this.usersRepository.save({
      ...user,
      preference: [
        ...user?.preference || [],
        ...category
      ]
    });
  }

  activate(user: User): Promise<User> {
    user.active = true;
    user.activationToken = null;
    
    return this.usersRepository.save(this.usersRepository.create(user));
  }
  
  async changePassword(id: number, newPassword: string) {
    const userEntity = await this.usersRepository.findOne({ where: {id} });

    userEntity.password = await this.encryptPassword(newPassword);
      
    const user = await this.usersRepository.save(userEntity);

    const {password, activationToken, ...result} = user;
    return result;
  }
}