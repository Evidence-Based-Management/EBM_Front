import { TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
    service = new ProductService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoult get a value when call getIterationsByPoduct', (done) => {
    httpClientSpy.get.and.returnValue(of(true));
    service.getIterationsByPoduct(1).subscribe((result) => {
      expect(result).toBeTruthy();
      done();
    });
  });

  it('should to provoke an error - getIterationsByPoduct(-1)', () => {
    httpClientSpy.get.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.getIterationsByPoduct(-1).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterationsByPoduct(-1) - instanceof ErrorEvent', () => {
    const errorEventFake = {
      error: new ErrorEvent('my type', {
        message: 'Error Code: 404\nMessage: Not found',
      }),
    };

    httpClientSpy.get.and.returnValue(throwError(errorEventFake));

    service.getIterationsByPoduct(-1).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
