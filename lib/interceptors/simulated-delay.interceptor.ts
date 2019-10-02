import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable()
export class SimulatedDelayInterceptor implements NestInterceptor {
  constructor(private readonly delayInMs: number = 0) { }

  public intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      delay(this.delayInMs),
      tap(() => console.log(`Delayed by ${this.delayInMs} ms`))
    );
  }
}
