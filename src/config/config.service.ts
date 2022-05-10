import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

require('dotenv').config();

@Injectable()
class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) { }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]) {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'opn_services_user',
      password: 'JA?=b2EfMhd.684g',
      database: 'opn_services',
      synchronize: true,
      autoLoadEntities: true,
    };
  }

  public getHost(): string {
    return this.getValue('HOST')
  }

  public getPort(): string {
    return this.getValue('PORT')
  }
}


const configService = new ConfigService(process.env)
  .ensureValues([
    'HOST',
    'PORT',
    'MODE',
    'MYSQL_HOST',
    'MYSQL_PORT',
    'MYSQL_USER',
    'MYSQL_PASSWORD',
    'MYSQL_DATABASE',
    'MAIL_HOST',
    'MAIL_PORT',
    'MAIL_USER',
    'MAIL_PASSWORD',
    'MAIL_FROM'
  ]);

export { configService };