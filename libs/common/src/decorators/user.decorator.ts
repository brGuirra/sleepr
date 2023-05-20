import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { UserDocument } from 'apps/auth/src/users/models';

const getUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

export const User = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => {
    return getUserByContext(context);
  },
);
