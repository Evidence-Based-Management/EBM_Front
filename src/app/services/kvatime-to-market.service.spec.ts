import { of, throwError } from 'rxjs';

import { KVATimeToMarketService } from './kvatime-to-market.service';

describe('KVATimeToMarketService', () => {
  let httpClientSpy: { put: jasmine.Spy; post: jasmine.Spy };
  let authClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };
  let service: KVATimeToMarketService;
  const kvaTimeToMarket = {
    buildAndIntegrationFrequency: 'string',
    cycleTime: 'string',
    id: 0,
    idIteration: 0,
    idTeam: 0,
    leadTime: 'string',
    meanTimeToRepair: 'string',
    releaseFrequency: 'string',
    releaseStabilizationPeriod: 'string',
    timeToLearn: 'string',
  };
  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'post']);
    authClientSpy = jasmine.createSpyObj('user', ['get', 'post', 'put']);
    service = new KVATimeToMarketService(
      httpClientSpy as any,
      authClientSpy as any
    );
  });

  it('should save a new KVATimeToMarket', () => {
    httpClientSpy.post.and.returnValue(
      of({ status: 200, kva_time_to_market: kvaTimeToMarket })
    );
    service.save(kvaTimeToMarket).subscribe((result) => {
      expect(result.kva_time_to_market).toEqual(kvaTimeToMarket);
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

  it('should updae a exist KVATimeToMarket', () => {
    httpClientSpy.put.and.returnValue(
      of({ status: 200, kva_time_to_market: kvaTimeToMarket })
    );

    service.update('1', kvaTimeToMarket).subscribe(
      (result) => {
        expect(result.kva_time_to_market).toEqual(kvaTimeToMarket);
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
