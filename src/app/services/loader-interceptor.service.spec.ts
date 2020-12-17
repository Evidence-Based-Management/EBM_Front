import {
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { LoaderState } from '../Interfaces/loader';

import { LoaderInterceptorService } from './loader-interceptor.service';
import { LoaderService } from './loader.service';

describe('LoaderInterceptorService', () => {
  let service: LoaderInterceptorService;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoaderService,
          useValue: {
            show: () => of({ show: true } as LoaderState),
            hide: () => of({ show: false } as LoaderState),
          },
        },
      ],
    });
    service = TestBed.inject(LoaderInterceptorService);
    loaderService = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should intercept  HTTSuccess', (done) => {
    const mockHandler = {
      handle: () => of(new HttpResponse({ status: 500 })),
    };

    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    service
      .intercept(new HttpRequest<unknown>('GET', '/thing'), mockHandler)
      .subscribe(() => {
        expect(loaderService.show).toHaveBeenCalled();
        expect(loaderService.hide).toHaveBeenCalled();
        done();
      });
  });

  it('should intercept not instance of HttpResponse', (done) => {
    const mockHandler: any = {
      handle: () => of({ status: 500 }),
    };

    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    service
      .intercept(new HttpRequest<unknown>('GET', '/thing'), mockHandler)
      .subscribe(() => {
        expect(loaderService.show).toHaveBeenCalled();
        done();
      });
  });

  it('should intercept HTTError', (done) => {
    const mockHandler = {
      handle: () =>
        throwError(
          new HttpErrorResponse({
            status: 500,
            error: { message: 'This is an error' },
          })
        ),
    };

    spyOn(loaderService, 'show');
    spyOn(loaderService, 'hide');

    service
      .intercept(new HttpRequest<unknown>('GET', '/thing'), mockHandler)
      .subscribe(
        (response) => {
          fail('Expected error');
        },
        (error) => {
          expect(error).toBeTruthy();
          done();
        }
      );
  });
});
