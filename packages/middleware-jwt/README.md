<p align="center">
  <a href="https://marblejs.com">
    <img src="https://github.com/marblejs/marble/blob/master/assets/img/logo.png?raw=true" width="200" alt="Marble.js logo"/>
  </a>
</p>

# @marblejs-contrib/middleware-jwt

A [JWT](http://jwt.io) middleware for [Marble.js](https://github.com/marblejs/marble).

## Installation

```
$ npm i @marblejs-contrib/middleware-jwt
```
Requires `@marblejs/core` and `@marblejs/http` to be installed.

## Usage

**Generate token:**
```typescript
import { r } from '@marblejs/http';
import { generateToken } from '@marblejs-contrib/middleware-jwt';
import { SECRET_KEY } from './config';

const login$ = r.pipe(
  r.matchPath('/login'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    //
    map(payload => generateToken({ secret: SECRET_KEY })(payload)), 👈
    // ...
  )));
```

**Validate payload:**
```typescript
import { pipe } from 'fp-ts/lib/function';

const verifyPayload$ = (payload: { id: string }) =>
  pipe(
    UserRepository.findById(payload.id),  // the repository can throw an error if not found or...
    catchError(/* ... */)                 // the `verifyPayload$` can throw it explicitly
  );
```

**Validate routes:**
```typescript
import { r } from '@marblejs/http';
import { authorize$ } from '@marblejs-contrib/middleware-jwt';
import { SECRET_KEY } from './config';

const getUsers$ = r.pipe(
  r.matchPath('/'),
  r.matchType('GET'),
  r.useEffect(req$ => req$.pipe(
    // ...
  )));

const user$ = combineRoutes('/user', {
  effects: [
    getUsers$
  ],
  middlewares: [
    authorize$({ secret: SECRET_KEY }, validatePayload$) 👈
  ],
});
```
License: MIT
