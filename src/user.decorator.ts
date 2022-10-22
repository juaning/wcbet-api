export interface User {
  id: string;
  email: string;
  nickname: string;
}

import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  const user: User = req.user || { id: 'link with auth0' };
  return user;
});
