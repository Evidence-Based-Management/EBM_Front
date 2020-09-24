import { of, throwError } from 'rxjs';
import { Iteration, Iterations } from '../Interfaces/iterations';

import { IterationsService } from './iterations.service';

describe('IterationsService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: IterationsService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new IterationsService(httpClientSpy as any);
  });

  it('should get all iterations with values', () => {
    const expectedIterations: Iterations = {
      iterations: [
        {
          id: '0',
          name: 'Sprint 1',
          goal: 'sprint goal 0',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          status: 'Completed',
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getIterations().subscribe(
      (result: Iterations) => {
        expect(result.iterations.length).toBeGreaterThan(0);
        expect(result.iterations[0].id).toBe('0');
        expect(result.iterations[0].name).toBe('Sprint 1');
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should get all iterations empty', () => {
    const expectedIterations: Iterations[] = new Array<Iterations>();

    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getIterations().subscribe(
      (result: Iterations[]) => {
        expect(result).toEqual(Array<Iterations>());
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should get a iteration by id', () => {
    const expectedIterations: Iterations = {
      iterations: [
        {
          id: '0',
          name: 'Sprint 1',
          goal: 'sprint goal 0',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          status: 'Completed',
        },
        {
          id: '-1',
          name: 'Sprint -1',
          goal: 'sprint goal -1',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          status: 'Completed',
        },
        {
          id: '-2',
          name: 'Sprint -2',
          goal: 'sprint goal -2',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          status: 'Completed',
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getIterationById('-1').subscribe(
      (result: Iteration[]) => {
        expect(result[0].id).toBe('-1');
        expect(result[0].name).toBe('Sprint -1');
      },
      (err) => console.log('HTTP Error getIterationById', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterations', () => {
    httpClientSpy.get.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.getIterations().subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterationById(-1)', () => {
    httpClientSpy.get.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.getIterationById('-1').subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterationById(-1) - instanceof ErrorEvent', () => {
    const errorEventFake = {
      error: new ErrorEvent('my type', {
        message: 'Error Code: 404\nMessage: Not found',
      }),
    };

    httpClientSpy.get.and.returnValue(throwError(errorEventFake));

    service.getIterationById('-1').subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
