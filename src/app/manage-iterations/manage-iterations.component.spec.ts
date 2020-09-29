import { ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { ManageIterationsComponent } from './manage-iterations.component';
import {
  A2I,
  CV,
  Iteration,
  Iterations,
  T2M,
  UV,
} from '../Interfaces/iterations';
import { IterationsService } from '../services/iterations.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { IterationCardComponent } from './iteration-card/iteration-card.component';

describe('ManageIterationsComponent', () => {
  let component: ManageIterationsComponent;
  let fixture: ComponentFixture<ManageIterationsComponent>;
  let iterationsService: IterationsService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  const CVFake: CV = {
    Revenue_Per_Employee: '2.500.000 COP',
    Product_Cost_Ratio: '500.000.000 - 100.000.000 COP',
    Employee_Satisfaction: '4/5',
    Customer_Satisfaction: '3/5',
    Customer_Usage_Index: '50/180 min',
  };

  const T2MFake: T2M = {
    Build_And_Integration_Frequency: '10 by week',
    Release_Frequency: 'Monthly',
    Release_Stabilization_Period: '3 days',
    Mean_Time_To_Repair: '3/5',    
    Cycle_Time: '1 month',
    Lead_Time: '3 months',
    Time_To_Learn: '1 months',
  };

  const A2IFake: A2I = {
    Feature_Usage_Index: ['30 min by day', '5 min by day', '60 min by day'],
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
    Market_Share: '3%',
    Customer_Or_User_Satisfaction_Gap: '5/10',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageIterationsComponent, IterationCardComponent],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getIterations: () =>
              of({
                iterations: [
                  {
                    id: '-1',
                    name: 'Fake',
                    goal: 'sprint goal -1',
                    startDate: '01/01/2020',
                    endDate: '01/31/2020',
                    status: 'Completed',
                    KVM: {
                      CV: CVFake,
                      T2M: T2MFake,
                      A2I: A2IFake,
                      UV: UVFake,
                    },
                  },
                ],
              }),
          },
        },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIterationsComponent);
    component = fixture.componentInstance;
    iterationsService = TestBed.inject(IterationsService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get at least iterations', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.callThrough();
    fixture.detectChanges();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(1);
  });

  it('should get empty iterations', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();
    // AA
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should get empty iterations - getIterations()', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();

    // Act
    component.getIterations();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should has 2 iterations when call setLocalIterations()', () => {
    // Arrange
    const fakeIterations: Iterations = {
      iterations: [
        {
          id: '-1',
          name: 'Fake',
          goal: 'sprint goal -1',
          startDate: '01/01/2020',
          endDate: '01/31/2020',
          status: 'Completed',
          KVM: {
            CV: CVFake,

            T2M: T2MFake,

            A2I: A2IFake,

            UV: UVFake,
          },
        },
        {
          id: '-2',
          name: 'Fake 2',
          goal: 'sprint goal -2',
          startDate: '02/01/2020',
          endDate: '02/28/2020',
          status: 'Completed',
          KVM: {
            CV: CVFake,

            T2M: T2MFake,

            A2I: A2IFake,

            UV: UVFake,
          },
        },
      ],
    };

    // Act
    component.setLocalIterations(fakeIterations);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(2);
  });

  it('should return a new Iteration - newIteration()', () => {
    // Arrange
    const fakeIterations: Iterations = {
      iterations: [
        {
          id: '-1',
          name: 'Fake',
          goal: 'sprint goal -1',
          startDate: '01/01/2020',
          endDate: '01/31/2020',
          status: 'Completed',
          KVM: {
            CV: CVFake,

            T2M: T2MFake,

            A2I: A2IFake,

            UV: UVFake,
          },
        },
        {
          id: '-2',
          name: 'Fake 2',
          goal: 'sprint goal -2',
          startDate: '01/01/2020',
          endDate: '02/28/2020',
          status: 'Completed',
          KVM: {
            CV: CVFake,

            T2M: T2MFake,

            A2I: A2IFake,

            UV: UVFake,
          },
        },
      ],
    };

    // Act
    const newIteration = component.newIteration(fakeIterations, 0);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
    expect(newIteration.id).toBe('-1');
    expect(newIteration.name).toBe('Fake');
  });

  it('should return a new Iteration - goToIterationDetails()', () => {
    // Arrange
    const fakeIterations: Iterations = {
      iterations: [
        {
          id: '-1',
          name: 'Fake',
          goal: 'sprint goal -1',
          startDate: '01/01/2020',
          endDate: '01/31/2020',
          status: 'Completed',
          KVM: {
            CV: CVFake,

            T2M: T2MFake,

            A2I: A2IFake,

            UV: UVFake,
          },
        },
        {
          id: '-2',
          name: 'Fake 2',
          goal: 'sprint goal -2',
          startDate: '01/01/2020',
          endDate: '02/28/2020',
          status: 'Completed',
          KVM: {
            CV: CVFake,

            T2M: T2MFake,

            A2I: A2IFake,

            UV: UVFake,
          },
        },
      ],
    };

    // Act
    const newIteration = component.newIteration(fakeIterations, 0);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
    expect(newIteration.id).toBe('-1');
    expect(newIteration.name).toBe('Fake');
  });

  it('should navigate to iteration', () => {
    // Act
    component.goToIterationDetails('1');

    // args passed to router.navigateByUrl() spy
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];

    // // Assert
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/iteration', '1']);
    expect(navArgs).toEqual(['/iteration', '1']);
  });

  it('should has 3 html cards', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({
        iterations: [
          {
            id: '-1',
            name: 'Fake',
            goal: 'sprint goal -1',
            startDate: '01/01/2020',
            endDate: '01/28/2020',
            status: 'Completed',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
          {
            id: '-2',
            name: 'Fake 2',
            goal: 'sprint goal -2',
            startDate: '02/01/2020',
            endDate: '02/28/2020',
            status: 'Completed',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
          {
            id: '-3',
            name: 'Fake 3',
            goal: 'sprint goal -3',
            startDate: '03/01/2020',
            endDate: '03/28/2020',
            status: 'Completed',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(By.css('.card'));

    // Assert
    expect(result.length).toBe(3);
  });

  it('should have 1 html card Completed', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({
        iterations: [
          {
            id: '-1',
            name: 'Fake',
            goal: 'sprint goal -1',
            startDate: '01/01/2020',
            endDate: '01/28/2020',
            status: 'Completed',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(
      By.css('.border-bottom-success')
    );

    // Assert
    expect(result.length).toBe(1);
  });

  it('should have 1 html card Fail', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({
        iterations: [
          {
            id: '-1',
            name: 'Fake',
            goal: 'sprint goal -1',
            startDate: '01/01/2020',
            endDate: '01/28/2020',
            status: 'Fail',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(
      By.css('.border-bottom-danger')
    );

    // Assert
    expect(result.length).toBe(1);
  });

  it('should have 1 html card In_Progress', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({
        iterations: [
          {
            id: '-1',
            name: 'Fake',
            goal: 'sprint goal -1',
            startDate: '01/01/2020',
            endDate: '01/28/2020',
            status: 'In_Progress',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(
      By.css('.border-bottom-warning')
    );

    // Assert
    expect(result.length).toBe(1);
  });

  it('should have 1 html card empty status', () => {
    // Arrange
    spyOn(iterationsService, 'getIterations').and.returnValue(
      of({
        iterations: [
          {
            id: '-1',
            name: 'Fake',
            goal: 'sprint goal -1',
            startDate: '01/01/2020',
            endDate: '01/28/2020',
            status: '',
            KVM: {
              CV: CVFake,

              T2M: T2MFake,

              A2I: A2IFake,

              UV: UVFake,
            },
          },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(
      By.css('.border-bottom-primary')
    );

    // Assert
    expect(result.length).toBe(1);
  });
});
