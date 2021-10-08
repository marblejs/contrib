import * as O from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';
import { HttpRequest } from '@marblejs/http';

const splitHeader = (header: string): string[] => header.split(' ');

const getLastElement = (array: string[]): string => array[array.length - 1];

export const parseAuthorizationHeader = (req: HttpRequest) =>
  pipe(
    O.fromNullable(req.headers.authorization),
    O.map(splitHeader),
    O.map(getLastElement),
    O.getOrElse(() => ''),
  );

