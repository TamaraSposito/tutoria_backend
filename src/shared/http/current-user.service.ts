import { ICurrentUser } from '@shared/interfaces/current-user.interface';
import { RequestContext } from 'nestjs-request-context';
import { Injectable } from '@nestjs/common';
import { ICurrentUserService } from '@shared/interfaces/current-user.service.interface';

@Injectable()
export class CurrentUserService implements ICurrentUserService {
  getUserInfo(): ICurrentUser {
    const req = RequestContext.currentContext.req;
    return req.user;
  }
}
