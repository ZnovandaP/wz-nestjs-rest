import { Reflector } from '@nestjs/core';

export enum RolesEnum {
  ADMIN = 'admin',
  COMMON = 'common',
  GUEST = 'guest',
  MASTER = 'master',
  SUPER_ADMIN = 'super_admin',
}

export const Roles = Reflector.createDecorator<RolesEnum[]>();
