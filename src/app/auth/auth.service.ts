import { Injectable } from '@nestjs/common';
import { User } from '@app/user/model/user.model';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginResponseDto } from '@app/auth/dtos/login.response.dto';
import * as process from 'process';
@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async login(user): Promise<LoginResponseDto> {
    const payload = { username: user.mail, sub: user.id, roles: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      expirationIn: process.env.JWT_EXPIRES_IN,
    };
  }

  async validateUser(mail: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        mail: mail,
      },
    });

    if (!user) return null;

    return compareSync(password, user?.password) ? user : null;
  }
}
