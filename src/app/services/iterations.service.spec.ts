import { of, throwError } from 'rxjs';
import {
  A2I,
  CV,
  Iteration,
  Iterations,
  T2M,
  UV,
} from '../Interfaces/iterations';

import { IterationsService } from './iterations.service';

describe('IterationsService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy; put: jasmine.Spy };
  let service: IterationsService;

  const CVFake: CV = {
    id: '1',
    Revenue_Per_Employee: '2.500.000 COP',
    Product_Cost_Ratio: '500.000.000 - 100.000.000 COP',
    Employee_Satisfaction: '4/5',
    Customer_Satisfaction: '3/5',
    Customer_Usage_Index: '50/180 min',
  };

  const T2MFake: T2M = {
    id: '1',
    Build_And_Integration_Frequency: '10 by week',
    Release_Frequency: 'Monthly',
    Release_Stabilization_Period: '3 days',
    Mean_Time_To_Repair: '3/5',
    Cycle_Time: '1 month',
    Lead_Time: '3 months',
    Time_To_Learn: '1 months',
  };

  const A2IFake: A2I = {
    id: '1',
    Feature_Usage_Index: '30 min by day',
    Innovation_Rate: '0.33',
    Defect_Trends: '+60',
    On_Product_Index: '80%',
    Installed_Version_Index: '2',
    Technical_Debt: '2 month',
    Production_Incident_Trends: '3 times by iteration',
    Active_Code_Branches: '5 hours',
    Time_Spent_Context_Switching: '3',
  };

  const UVFake: UV = {
    id: '1',
    Market_Share: '3%',
    Customer_Or_User_Satisfaction_Gap: '5/10',
  };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put']);
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
          state: 'Completed',
          KVM: {
            CV: CVFake,
            T2M: T2MFake,
            A2I: A2IFake,
            UV: UVFake,
          },
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getIterationsByTeam(1).subscribe(
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

    service.getIterationsByTeam(1).subscribe(
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
          state: 'Completed',
          KVM: {
            CV: CVFake,
            T2M: T2MFake,
            A2I: A2IFake,
            UV: UVFake,
          },
        },
        {
          id: '-1',
          name: 'Sprint -1',
          goal: 'sprint goal -1',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          state: 'Completed',
          KVM: {
            CV: CVFake,
            T2M: T2MFake,
            A2I: A2IFake,
            UV: UVFake,
          },
        },
        {
          id: '-2',
          name: 'Sprint -2',
          goal: 'sprint goal -2',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          state: 'Completed',
          KVM: {
            CV: CVFake,
            T2M: T2MFake,
            A2I: A2IFake,
            UV: UVFake,
          },
        },
      ],
    };
    httpClientSpy.get.and.returnValue(of(expectedIterations));

    service.getIterationById('-1').subscribe(
      (result: any) => {
        expect(result.iterations[0].id).toBe('0');
        expect(result.iterations[0].name).toBe('Sprint 1');
      },
      (err) => console.log('HTTP Error getIterationById', err)
    );
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - getIterations', () => {
    httpClientSpy.get.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.getIterationsByTeam(1).subscribe(
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

  it('should save an iteration', () => {
    const expectedIterations: Iterations = {
      iterations: [
        {
          id: '0',
          name: 'Sprint 1',
          goal: 'sprint goal 0',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          state: 'Completed',
          KVM: {
            CV: CVFake,
            T2M: T2MFake,
            A2I: A2IFake,
            UV: UVFake,
          },
        },
      ],
    };

    httpClientSpy.post.and.returnValue(
      of({ status: 200, iteration: expectedIterations.iterations[0] })
    );

    service.save(expectedIterations.iterations[0]).subscribe(
      (result) => {
        expect(result.iteration).toEqual(expectedIterations.iterations[0]);
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - save', () => {
    const expectedIterations: Iterations = {
      iterations: [
        {
          id: '0',
          name: 'Sprint 1',
          goal: 'sprint goal 0',
          startDate: '01/01/2020',
          endDate: '01/28/2020',
          state: 'Completed',
          KVM: {
            CV: CVFake,
            T2M: T2MFake,
            A2I: A2IFake,
            UV: UVFake,
          },
        },
      ],
    };

    httpClientSpy.post.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.save(expectedIterations.iterations[0]).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.post.calls.count()).toBe(1, 'one call');
  });

  it('should update an iteration', () => {
    httpClientSpy.put.and.returnValue(of({ status: 200, iteration: {} }));

    service.update('1', {}).subscribe(
      (result) => {
        expect(result.iteration).toEqual({});
      },
      (err) => console.log('HTTP Error', err)
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });

  it('should to provoke an error - update', () => {
    httpClientSpy.put.and.returnValue(
      throwError({ status: 404, message: 'Not found' })
    );

    service.update('1', {}).subscribe(
      (result) => console.log('good', result),
      (err) => {
        expect(err).toEqual(`Error Code: 404\nMessage: Not found`);
      }
    );
    expect(httpClientSpy.put.calls.count()).toBe(1, 'one call');
  });
});
