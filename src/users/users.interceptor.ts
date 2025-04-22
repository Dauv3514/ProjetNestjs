import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// 👇 Interface représentant un utilisateur complet
interface User {
  id: string;
  userName: string;
  userPassword: string;
  // ajoute d'autres champs ici si nécessaire
}

@Injectable()
export class UsersInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Omit<User, 'userPassword'>[]> {
    return next.handle().pipe(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      map((data: User[]) => data.map(({ userPassword, ...user }) => user)),
    );
  }
}
