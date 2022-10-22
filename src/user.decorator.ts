interface RawUser {
  iss: string;
  sub: string; // this is used as user id
  aud: string[];
  iat: number;
  exp: number;
  azp: string;
  scope: string;
}

export interface User extends RawUser {
  id: string;
  email: string;
}

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();
  const rawUser: RawUser = req.user;
  const email = rawUser['wc-bet-api-email'];
  const user: User = { ...rawUser, email, id: rawUser.sub };
  return user;
});
