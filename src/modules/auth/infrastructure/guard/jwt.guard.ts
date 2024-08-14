import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/role.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthenticated = await super.canActivate(context);
    if (!isAuthenticated) {
      throw new UnauthorizedException();
    }

    const request = context.switchToHttp().getRequest();
    const getRole = request.user.role as string;

    const roles = this.reflector.get<string[]>(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const hasRole = roles.some((role) =>
      role.toLowerCase().includes(getRole.toLowerCase()),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Role ${getRole} not allowed, for this resources`,
      );
    }

    return true;
  }
}
