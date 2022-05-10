import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }

  async validateUserCredentials(email: string, password: string): Promise<any> {   
    const user = await this.usersService.findOne({email}, true);
    const isMatch = await bcrypt.compare(password, user?.password)
    
    if (isMatch) {
        const {password, ...result} = user;
        return result;
    }
    
    return null;
  
  }

  async loginWithCredentials(user: any) {
    const payload = { email: user.username, id: user.userId };

    return {
        access_token: this.jwtTokenService.sign(payload),
    };
  }
}
