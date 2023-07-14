import { createParamDecorator, ExecutionContext } from '@nestjs/common';
export const UserId = createParamDecorator((_, context: ExecutionContext) => {
  const { user } = context.switchToHttp().getRequest();

  return user.id;
});
