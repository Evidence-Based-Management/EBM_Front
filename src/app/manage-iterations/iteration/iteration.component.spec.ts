import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule, MatTab, MatTabGroup } from '@angular/material/tabs';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { Iteration, UV } from 'src/app/Interfaces/iterations';
import { IterationsService } from 'src/app/services/iterations.service';
import { IterationCardComponent } from '../iteration-card/iteration-card.component';

import { IterationComponent } from './iteration.component';
import { CV, T2M, A2I } from '../../Interfaces/iterations';

describe('IterationComponent', () => {
  let component: IterationComponent;
  let fixture: ComponentFixture<IterationComponent>;
  let iterationsService: IterationsService;

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

  const iterationFake = [
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
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IterationComponent, IterationCardComponent],
      imports: [AppRoutingModule, BrowserAnimationsModule, MatTabsModule],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getIterationById: () => of(iterationFake),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IterationComponent);
    component = fixture.componentInstance;
    iterationsService = TestBed.inject(IterationsService);
  });

  it('should create', () => {
    // Arrange
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(
      By.css('.border-bottom-success')
    );

    const name = fixture.debugElement.queryAll(
      By.css('.h4.mb-0.font-weight-bold.text-gray-800')
    );

    const goal = fixture.debugElement.queryAll(By.css('.blockquote-footer'));

    // Assert
    expect(result.length).toBe(1);
    expect(name[0].nativeElement.innerHTML).toBe(' Fake ');
    expect(goal[0].nativeElement.innerHTML).toBe('sprint goal -1');

    expect(component).toBeTruthy();
  });

  it('should get empty iterations - getIterationById()', () => {
    // Arrange
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of({ iterations: new Array<Iteration>() })
    );
    fixture.detectChanges();

    // Act
    component.getIteration();

    // Assert
    expect(component.iteration).toBeUndefined();
  });

  it('should get an iteration - getIterationById()', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    fixture.detectChanges();

    // Act
    component.getIteration();

    // Assert
    expect(component.iteration).toEqual(iterationFake[0]);
  });

  it('should exist a table CV at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();
    const tableCV = fixture.debugElement.queryAll(By.css('#CV'));
    // Assert
    expect(tableCV.length).toEqual(1);
  });

  it('should exist data for CV table at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();
    const tableCV = fixture.debugElement.queryAll(By.css('#CV td'));

    // Assert
    expect(tableCV[2].nativeElement.innerHTML).toEqual('2.500.000 COP');
    expect(tableCV[5].nativeElement.innerHTML).toEqual(
      '500.000.000 - 100.000.000 COP'
    );
    expect(tableCV[8].nativeElement.innerHTML).toEqual('4/5');
    expect(tableCV[11].nativeElement.innerHTML).toEqual('3/5');
    expect(tableCV[14].nativeElement.innerHTML).toEqual('50/180 min');
  });

  it('should exist a table T2M at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const tabsT2M = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    tabsT2M[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableT2M = fixture.debugElement.queryAll(By.css('#T2M'));

      // Assert
      expect(tableT2M.length).toEqual(1);
    });
    expect(tabsT2M.length).toBeGreaterThan(1);
  });

  it('should exist data for T2M table at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const tabsT2M = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    tabsT2M[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableT2M = fixture.debugElement.queryAll(By.css('#T2M td'));

      // Assert
      expect(tableT2M[2].nativeElement.innerHTML).toEqual('10 by week');
      expect(tableT2M[5].nativeElement.innerHTML).toEqual('Monthly');
      expect(tableT2M[8].nativeElement.innerHTML).toEqual('3 days');
      expect(tableT2M[11].nativeElement.innerHTML).toEqual('3/5');
      expect(tableT2M[14].nativeElement.innerHTML).toEqual('1 month');
      expect(tableT2M[17].nativeElement.innerHTML).toEqual('3 months');
      expect(tableT2M[20].nativeElement.innerHTML).toEqual('1 months');
    });

    expect(tabsT2M.length).toBeGreaterThan(1);
  });

  it('should exist a table A2I at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const tabsA2I = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    tabsA2I[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableA2I = fixture.debugElement.queryAll(By.css('#A2I'));

      // Assert
      expect(tableA2I.length).toEqual(1);
    });
    expect(tabsA2I.length).toBeGreaterThan(1);
  });

  it('should exist data for A2I table at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const tabsA2I = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    tabsA2I[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableA2I = fixture.debugElement.queryAll(By.css('#A2I td'));

      // Assert
      expect(tableA2I[2].nativeElement.innerHTML).toEqual(
        '30 min by day,5 min by day,60 min by day'
      );
      expect(tableA2I[5].nativeElement.innerHTML).toEqual('0.33');
      expect(tableA2I[8].nativeElement.innerHTML).toEqual('+60');
      expect(tableA2I[11].nativeElement.innerHTML).toEqual('80%');
      expect(tableA2I[14].nativeElement.innerHTML).toEqual('2');
      expect(tableA2I[17].nativeElement.innerHTML).toEqual('2 month');
      expect(tableA2I[20].nativeElement.innerHTML).toEqual(
        '3 times by iteration'
      );
      expect(tableA2I[23].nativeElement.innerHTML).toEqual('5 hours');
      expect(tableA2I[26].nativeElement.innerHTML).toEqual('3');
    });

    expect(tabsA2I.length).toBeGreaterThan(1);
  });

  it('should exist a table UV at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const tabsUV = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    tabsUV[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableUV = fixture.debugElement.queryAll(By.css('#UV'));

      // Assert
      expect(tableUV.length).toEqual(1);
    });
    expect(tabsUV.length).toBeGreaterThan(1);
  });

  it('should exist data for UV table at HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const tabsUV = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    tabsUV[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const tableUV = fixture.debugElement.queryAll(By.css('#UV td'));

      // Assert
      expect(tableUV[2].nativeElement.innerHTML).toEqual('3%');
      expect(tableUV[5].nativeElement.innerHTML).toEqual('5/10');
    });

    expect(tabsUV.length).toBeGreaterThan(1);
  });
});
