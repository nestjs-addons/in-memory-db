import { CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { SimulatedDelayInterceptor } from './simulated-delay.interceptor';
import { delay } from 'rxjs/operators';

describe('SimulatedDelayInterceptor', () => {
  let interceptor: SimulatedDelayInterceptor;
  let callHandler: CallHandler;

  beforeEach(() => {
    interceptor = new SimulatedDelayInterceptor(1000);
    callHandler = { handle: () => of() };
  });

  test('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});
