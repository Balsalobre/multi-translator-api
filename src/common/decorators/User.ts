import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserResponse } from '../../auth/dto/userResponse';

export const User = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return (request.user as UserResponse) || null;
});
