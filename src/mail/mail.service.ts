import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { configService } from 'src/config/config.service';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) {}

  async sendUserConfirmation(user: UserDto) {
    const url = `${configService.getHost()+configService.getPort()}/auth/confirm-email/${user.activationToken}`;
    
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Support Team" <e-commerce@gmail.com>',
      subject: 'Welcome! Confirm your Email',
      html: `<p>Hey ${user.firstName} ${user.lastName},</p>
        <p>Please click below to confirm your email</p>
        <p>
            <a href="${url}">Confirm</a>
        </p>
        
        <p>If you did not request this email you can safely ignore it.</p>`,
    });
  }
}
