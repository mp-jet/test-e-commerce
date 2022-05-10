import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from './mail/mail.module';
import { configService } from './config/config.service';
import { CategoryModule } from './category/category.module';


@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    UsersModule,
    MailModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
