import { of, throwError } from 'rxjs';

import { KVACurrentValueService } from './kvacurrent-value.service';

describe('KVACurrentValueService', () => {
  let httpClientSpy: { put: jasmine.Spy; post: jasmine.Spy };
  let authClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };
  let service: KVACurrentValueService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'post']);
    authClientSpy = jasmine.createSpyObj('user', ['get', 'post', 'put']);
    service = new KVACurrentValueService(
      httpClientSpy as any,
      authClientSpy as any
    );
  });

  it('should save a new KVACurrentValueService', () => {
    const kvaCurrentValue = {
      customerSatisfaction: '4/5',
      customerUsageIndex: '50/180 min',
      employeeSatisfaction: '3/5',
      id: 0,
      idIteration: 0,
      idTeam: 0,
      productCostRatio: '500.000.000 - 100.000.000 COP',
      revenuePerEmployee: '8.500.000 COP',
    };

    httpClientSpy.post.and.returnValue(
      of({ status: 200, kva_current_value: kvaCurrentValue })
    );
    service.save(kvaCurrentValue).subscribe((result) => {
      expect(result.kva_current_value).toEqual(kvaCurrentValue);
    });
  });

  it('should to provoke an error - save', () => {
    httpClientSpy.post.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.save({}).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should updae a exist KVACurrentValueService', () => {
    const kvaCurrentValue = {
      customerSatisfaction: '4/5',
      customerUsageIndex: '50/180 min',
      employeeSatisfaction: '3/5',
      id: 0,
      idIteration: 0,
      idTeam: 0,
      productCostRatio: '500.000.000 - 100.000.000 COP',
      revenuePerEmployee: '8.500.000 COP',
    };
    httpClientSpy.put.and.returnValue(
      of({ status: 200, kva_current_value: kvaCurrentValue })
    );

    service.update('1', kvaCurrentValue).subscribe(
      (result) => {
        expect(result.kva_current_value).toEqual(kvaCurrentValue);
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');

    expect(service).toBeTruthy();
  });

  it('should to provoke an error - update', () => {
    httpClientSpy.put.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.update('', {}).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - update(-1) - instanceof ErrorEvent', () => {
    const errorEventFake = {
      error: new ErrorEvent('my type', {
        message: 'Error Code: 404\nMessage: Not found',
      }),
    };

    httpClientSpy.put.and.returnValue(throwError(errorEventFake));

    service.update('-1', {}).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });
});
