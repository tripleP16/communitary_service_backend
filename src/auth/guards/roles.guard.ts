import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context) as Observable<boolean>;
  }

  handleRequest(err, user, info, context: ExecutionContext) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization
      ? request.headers.authorization.split(' ')[1]
      : null;

    if (!token) {
      throw new ForbiddenException('No token provided');
    }

    const payload = this.decodeToken(token);

    const actions: string[] = payload.actions;

    const compareTo: string = this.reflector.get<string>(
      'action',
      context.getHandler(),
    );

    if (!actions.includes(compareTo)) {
      throw new ForbiddenException('The user can not execute the action');
    }

    return user;
  }

  private decodeToken(token: string) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const jwt = require('jsonwebtoken');
    return jwt.decode(token);
  }
}
