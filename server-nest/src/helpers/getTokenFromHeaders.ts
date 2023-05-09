import { UnauthorizedException } from '@nestjs/common';

export const getTokenFromHeaders = (authorizationHeader) => {
  const [bearer, accessToken] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !accessToken) {
    throw new UnauthorizedException({
      message: 'Пользователь не авторизован',
    });
  }
  return accessToken;
};
