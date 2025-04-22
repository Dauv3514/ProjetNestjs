import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    console.log('Request recu');
    return next
      .handle()
      .pipe(
        tap(() => console.log(`Request processée en ${Date.now() - now}ms`)),
      );
  }
}
