import { HttpException, HttpStatus } from '@nestjs/common';
import { isEmpty } from '@nestjs/common/utils/shared.utils';

export const HTTPError = (message: string, status: HttpStatus) =>
  new HttpException(
    {
      status: status,
      error: message,
    },
    status,
    {},
  );
