import { of } from 'rxjs';
import { Iterations } from '../Interfaces/iterations';

import { IterationsService } from './iterations.service';

describe('IterationsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: IterationsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new IterationsService(httpClientSpy as any);
  });

  it('Json should has values', () => {
    const expectedIterations: Iterations = {
      iterations: [{ id: '0', name: 'Sprint 1' }],
    };
    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getJsonIterations().subscribe(
      (result: Iterations) => {
        expect(result.iterations.length).toBeGreaterThan(0);
        expect(result.iterations[0].id).toBe('0');
        expect(result.iterations[0].name).toBe('Sprint 1');
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('Json should not has values', () => {
    const expectedIterations: Iterations[] = new Array<Iterations>();

    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getJsonIterations().subscribe(
      (result: Iterations[]) => {
        expect(result).toEqual(Array<Iterations>());
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
