import { of, throwError } from 'rxjs';

import { KVAAbilityToInnovateService } from './kvaability-to-innovate.service';

describe('KVAAbilityToInnovateService', () => {
  let httpClientSpy: { put: jasmine.Spy; post: jasmine.Spy };
  let authClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };

  let service: KVAAbilityToInnovateService;
  const kvaAbilityToInnovate = {
    activeCodeBranchesTimeSpentMergingCodeBetweenBranches: 'string',
    defectTrends: 'string',
    featureUsageIndex: 'string',
    id: 0,
    idIteration: 0,
    idTeam: 0,
    innovationRate: 'string',
    installedVersionIndex: 'string',
    onProductIndex: 'string',
    productionIncidentTrends: 'string',
    technicalDebt: 'string',
    timeSpentContextSwitching: 'string',
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['put', 'post']);
    authClientSpy = jasmine.createSpyObj('user', ['get', 'post', 'put']);
    service = new KVAAbilityToInnovateService(
      httpClientSpy as any,
      authClientSpy as any
    );
  });

  it('should save a new KVA Ability To Innovate', () => {
    httpClientSpy.post.and.returnValue(
      of({ status: 200, kva_ability_to_innovate: kvaAbilityToInnovate })
    );
    service.save(kvaAbilityToInnovate).subscribe((result) => {
      expect(result.kva_ability_to_innovate).toEqual(kvaAbilityToInnovate);
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

  it('should updae a exist KVA Ability To Innovate', () => {
    httpClientSpy.put.and.returnValue(
      of({ status: 200, kva_ability_to_innovate: kvaAbilityToInnovate })
    );

    service.update('1', kvaAbilityToInnovate).subscribe(
      (result) => {
        expect(result.kva_ability_to_innovate).toEqual(kvaAbilityToInnovate);
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
