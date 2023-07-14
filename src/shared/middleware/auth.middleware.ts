import { verify } from 'jsonwebtoken';
import { NestMiddleware, Injectable, ForbiddenException } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: Request | any, res: Response, next: () => void) {
    const bearerHeader = req.headers.authorization;
    const accessToken = bearerHeader && bearerHeader.split(' ')[1];
    let user;

    if (!bearerHeader || !accessToken) {
      return next();
    }

    try {
      const { sub, roles, username }: any = verify(
        accessToken,
        process.env.JWT_SECRET_KEY,
      );
      user = {
        id: sub,
        roles: roles,
        username: username,
      };
    } catch (error) {
      throw new ForbiddenException('Token is not valid');
    }

    if (user) {
      req.user = user;
    }
    next();
  }
}
