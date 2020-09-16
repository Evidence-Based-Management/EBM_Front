import { of } from 'rxjs';
import { Iteration } from '../Interfaces/iterations';

import { IterationsService } from './iterations.service';

describe('IterationsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: IterationsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new IterationsService(httpClientSpy as any);
  });

  it('Json should has values', () => {
    const expectedIterations: Iteration[] = [
      { iterations: { id: '0', name: 'Sprint 1' } },
    ];

    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getJsonIterations().subscribe(
      (result: Iteration[]) => {
        expect(result.length).toBeGreaterThan(0);
        expect(result[0].iterations.id).toBe('0');
        expect(result[0].iterations.name).toBe('Sprint 1');
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('Json should not has values', () => {
    const expectedIterations: Iteration[] = new Array<Iteration>();

    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getJsonIterations().subscribe(
      (result: Iteration[]) => {
        expect(result).toEqual(Array<Iteration>());
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
