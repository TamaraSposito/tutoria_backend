import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from '@app/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@app/user/model/user.model';
import * as process from 'process';
import { RolesGuard } from '@app/auth/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { LocalStrategy } from '@app/auth/strategies/local.strategy';
import { JwtStrategy } from '@app/auth/strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@app/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      privateKey: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
