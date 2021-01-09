import { of, throwError } from 'rxjs';

import { KVAUnrealizedValueService } from './kvaunrealized-value.service';

describe('KVAUnrealizedValueService', () => {
  let httpClientSpy: { put: jasmine.Spy; post: jasmine.Spy };
  let authClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };
  let service: KVAUnrealizedValueService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'post']);
    authClientSpy = jasmine.createSpyObj('user', ['get', 'post', 'put']);
    service = new KVAUnrealizedValueService(
      httpClientSpy as any,
      authClientSpy as any
    );
  });

  it('should save a new KVAUnrealizedValueService', () => {
    const kvaUnrealizedValue = {
      idIteration: '1',
      idTeam: '2',
      customerSatisfactionGap: '50/100',
      marketShare: '50%',
    };
    httpClientSpy.post.and.returnValue(
      of({ status: 200, kvaunrealized_value: kvaUnrealizedValue })
    );

    service.save(kvaUnrealizedValue).subscribe(
      (result) => {
        expect(result.kvaunrealized_value).toEqual(kvaUnrealizedValue);
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');

    expect(service).toBeTruthy();
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

  it('should updae a exist KVAUnrealizedValueService', () => {
    const kva = {
      idIteration: '1',
      idTeam: '2',
      customerSatisfactionGap: '50/100',
      marketShare: '50%',
    };
    httpClientSpy.put.and.returnValue(
      of({ status: 200, kvaunrealized_value: kva })
    );

    service.update('1', kva).subscribe(
      (result) => {
        expect(result.kvaunrealized_value).toEqual(kva);
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
