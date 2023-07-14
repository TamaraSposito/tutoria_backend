import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '@app/auth/auth.service';
import { MessagesError } from '@shared/resources/messages-error';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'mail',
    });
  }
  async validate(mail: string, password: string) {
    const user = await this.authService.validateUser(mail, password);

    if (!user)
      throw new UnauthorizedException(MessagesError.INVALID_EMAIL_PASSWORD);

    return user;
  }
}
