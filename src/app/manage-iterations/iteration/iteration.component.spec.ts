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
import { KeyValueMesuresComponent } from '../key-value-mesures/key-value-mesures.component';

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

  let iterationFake = [
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
      declarations: [
        IterationComponent,
        IterationCardComponent,
        KeyValueMesuresComponent,
      ],
      imports: [AppRoutingModule, BrowserAnimationsModule, MatTabsModule],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getIterationById: () => of(iterationFake),
            updateIteration: () =>
              of({ status: 200, iteration: iterationFake[0] }),
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

    const name = fixture.debugElement.queryAll(
      By.css('.h4.mb-0.font-weight-bold.text-gray-800')
    );

    const goal = fixture.debugElement.queryAll(By.css('.blockquote-footer'));

    // Assert
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

  it('should exist 5 KeyValueMesuresComponent CV at first HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();
    const KVMComponent_CV = fixture.debugElement.queryAll(
      By.directive(KeyValueMesuresComponent)
    );
    // Assert
    expect(KVMComponent_CV.length).toEqual(5);
  });

  it('should exist data for CV at input HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();
    const Revenue_Per_Employee = fixture.debugElement.queryAll(
      By.css('#input_Revenue_Per_Employee')
    );
    const Product_Cost_Ratio = fixture.debugElement.queryAll(
      By.css('#input_Product_Cost_Ratio')
    );
    const Employee_Satisfaction = fixture.debugElement.queryAll(
      By.css('#input_Employee_Satisfaction')
    );
    const Customer_Satisfaction = fixture.debugElement.queryAll(
      By.css('#input_Customer_Satisfaction')
    );
    const Customer_Usage_Index = fixture.debugElement.queryAll(
      By.css('#input_Customer_Usage_Index')
    );

    // Assert
    expect(Revenue_Per_Employee[0].nativeElement.value).toEqual(
      '2.500.000 COP'
    );
    expect(Product_Cost_Ratio[0].nativeElement.value).toEqual(
      '500.000.000 - 100.000.000 COP'
    );
    expect(Employee_Satisfaction[0].nativeElement.value).toEqual('4/5');
    expect(Customer_Satisfaction[0].nativeElement.value).toEqual('3/5');
    expect(Customer_Usage_Index[0].nativeElement.value).toEqual('50/180 min');
  });

  it('should exist 7 KeyValueMesuresComponent T2M at second HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const KVMComponent_T2M = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    KVMComponent_T2M[1].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const KVMComponents_T2M = fixture.debugElement.queryAll(
        By.directive(KeyValueMesuresComponent)
      );

      // Assert (5 from CV + 7 from T2M)
      const totalKeyValueMesuresComponent = 7 + 5;

      expect(KVMComponents_T2M.length).toEqual(totalKeyValueMesuresComponent);
    });
    expect(KVMComponent_T2M.length).toBeGreaterThan(1);
  });

  it('should exist data for T2M at inputs HTML Tabs', () => {
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
      const Build_And_Integration_Frequency = fixture.debugElement.queryAll(
        By.css('#input_Build_And_Integration_Frequency')
      );
      const Release_Frequency = fixture.debugElement.queryAll(
        By.css('#input_Release_Frequency')
      );
      const Release_Stabilization_Period = fixture.debugElement.queryAll(
        By.css('#input_Release_Stabilization_Period')
      );
      const Mean_Time_To_Repair = fixture.debugElement.queryAll(
        By.css('#input_Mean_Time_To_Repair')
      );
      const Cycle_Time = fixture.debugElement.queryAll(
        By.css('#input_Cycle_Time')
      );
      const Lead_Time = fixture.debugElement.queryAll(
        By.css('#input_Lead_Time')
      );
      const Time_To_Learn = fixture.debugElement.queryAll(
        By.css('#input_Time_To_Learn')
      );

      // Assert
      expect(Build_And_Integration_Frequency[0].nativeElement.value).toEqual(
        '10 by week'
      );
      expect(Release_Frequency[0].nativeElement.value).toEqual('Monthly');
      expect(Release_Stabilization_Period[0].nativeElement.value).toEqual(
        '3 days'
      );
      expect(Mean_Time_To_Repair[0].nativeElement.value).toEqual('3/5');
      expect(Cycle_Time[0].nativeElement.value).toEqual('1 month');
      expect(Lead_Time[0].nativeElement.value).toEqual('3 months');
      expect(Time_To_Learn[0].nativeElement.value).toEqual('1 months');
    });

    expect(tabsT2M.length).toBeGreaterThan(1);
  });

  it('should exist 8 KeyValueMesuresComponent A2I at third HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const KVMComponent_A2I = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    KVMComponent_A2I[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const KVMComponents_A2I = fixture.debugElement.queryAll(
        By.directive(KeyValueMesuresComponent)
      );

      // Assert (5 from CV +  8 from A2I)
      const totalKeyValueMesuresComponent = 5 + 9;
      expect(KVMComponents_A2I.length).toEqual(totalKeyValueMesuresComponent);
    });
    expect(KVMComponent_A2I.length).toBeGreaterThan(1);
  });

  it('should exist data for A2I at inputs HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const KVMComponent_A2I = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    KVMComponent_A2I[2].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const Feature_Usage_Index = fixture.debugElement.queryAll(
        By.css('#input_Feature_Usage_Index')
      );
      const Innovation_Rate = fixture.debugElement.queryAll(
        By.css('#input_Innovation_Rate')
      );
      const Defect_Trends = fixture.debugElement.queryAll(
        By.css('#input_Defect_Trends')
      );
      const On_Product_Index = fixture.debugElement.queryAll(
        By.css('#input_On_Product_Index')
      );
      const Installed_Version_Index = fixture.debugElement.queryAll(
        By.css('#input_Installed_Version_Index')
      );
      const Technical_Debt = fixture.debugElement.queryAll(
        By.css('#input_Technical_Debt')
      );
      const Production_Incident_Trends = fixture.debugElement.queryAll(
        By.css('#input_Production_Incident_Trends')
      );
      const Active_Code_Branches = fixture.debugElement.queryAll(
        By.css('#input_Active_Code_Branches')
      );
      const Time_Spent_Context_Switching = fixture.debugElement.queryAll(
        By.css('#input_Time_Spent_Context_Switching')
      );

      // Assert
      expect(Feature_Usage_Index[0].nativeElement.value).toEqual(
        '30 min by day,5 min by day,60 min by day'
      );
      expect(Innovation_Rate[0].nativeElement.value).toEqual('0.33');
      expect(Defect_Trends[0].nativeElement.value).toEqual('+60');
      expect(On_Product_Index[0].nativeElement.value).toEqual('80%');
      expect(Installed_Version_Index[0].nativeElement.value).toEqual('2');
      expect(Technical_Debt[0].nativeElement.value).toEqual('2 month');
      expect(Production_Incident_Trends[0].nativeElement.value).toEqual(
        '3 times by iteration'
      );
      expect(Active_Code_Branches[0].nativeElement.value).toEqual('5 hours');
      expect(Time_Spent_Context_Switching[0].nativeElement.value).toEqual('3');
    });

    expect(KVMComponent_A2I.length).toBeGreaterThan(1);
  });

  it('should exist 2 KeyValueMesuresComponent UV at second HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const KVMComponent_UV = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    KVMComponent_UV[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const KVMComponents_UV = fixture.debugElement.queryAll(
        By.directive(KeyValueMesuresComponent)
      );

      // Assert (5 from CV +  2 from UV)
      const totalKeyValueMesuresComponent = 5 + 2;
      expect(KVMComponents_UV.length).toEqual(totalKeyValueMesuresComponent);
    });
    expect(KVMComponent_UV.length).toBeGreaterThan(1);
  });

  it('should exist data for UV at inputs HTML Tabs', () => {
    // Arrange

    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const KVMComponent_UV = fixture.debugElement.queryAll(
      By.css('.mat-ripple.mat-tab-label.mat-focus-indicator')
    );

    KVMComponent_UV[3].triggerEventHandler('click', null);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      const Market_Share = fixture.debugElement.queryAll(
        By.css('#input_Market_Share')
      );
      const Customer_Or_User_Satisfaction_Gap = fixture.debugElement.queryAll(
        By.css('#input_Customer_Or_User_Satisfaction_Gap')
      );

      // Assert
      expect(Market_Share[0].nativeElement.value).toEqual('3%');
      expect(Customer_Or_User_Satisfaction_Gap[0].nativeElement.value).toEqual(
        '5/10'
      );
    });

    expect(KVMComponent_UV.length).toBeGreaterThan(1);
  });

  it('should exist a button when the iteration is In_Progress', () => {
    // Arrange
    iterationFake = [
      {
        id: '-1',
        name: 'Fake',
        goal: 'sprint goal -1',
        startDate: '01/01/2020',
        endDate: '01/31/2020',
        status: 'In_Progress',
        KVM: {
          CV: CVFake,

          T2M: T2MFake,

          A2I: A2IFake,

          UV: UVFake,
        },
      },
    ];
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();
    const buttonSave = fixture.debugElement.queryAll(By.css('button'));

    // Assert
    expect(buttonSave.length).toBe(1);
  });

  it('should not exist a button when the iteration is Completed', () => {
    // Arrange
    iterationFake = [
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
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const buttonSave = fixture.debugElement.queryAll(By.css('button'));

    // Assert
    expect(buttonSave.length).toBe(0);
  });

  it('should not exist a button when the iteration is Fail', () => {
    // Arrange
    iterationFake = [
      {
        id: '-1',
        name: 'Fake',
        goal: 'sprint goal -1',
        startDate: '01/01/2020',
        endDate: '01/31/2020',
        status: 'Fail',
        KVM: {
          CV: CVFake,

          T2M: T2MFake,

          A2I: A2IFake,

          UV: UVFake,
        },
      },
    ];
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();

    const buttonSave = fixture.debugElement.queryAll(By.css('button'));

    // Assert
    expect(buttonSave.length).toBe(0);
  });

  it('should not exist a button when the iteration is empty', () => {
    // Arrange
    iterationFake = [
      {
        id: '-1',
        name: 'Fake',
        goal: 'sprint goal -1',
        startDate: '01/01/2020',
        endDate: '01/31/2020',
        status: '',
        KVM: {
          CV: CVFake,

          T2M: T2MFake,

          A2I: A2IFake,

          UV: UVFake,
        },
      },
    ];
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    // Act
    fixture.detectChanges();
    const buttonSave = fixture.debugElement.queryAll(By.css('button'));

    // Assert
    expect(buttonSave.length).toBe(0);
  });

  it('should update an iteration', () => {
    // Arrange
    iterationFake = [
      {
        id: '-1',
        name: 'Fake',
        goal: 'sprint goal -1',
        startDate: '01/01/2020',
        endDate: '01/31/2020',
        status: '',
        KVM: {
          CV: CVFake,

          T2M: T2MFake,

          A2I: A2IFake,

          UV: UVFake,
        },
      },
    ];
    spyOn(iterationsService, 'getIterationById').and.returnValue(
      of(iterationFake)
    );
    spyOn(iterationsService, 'updateIteration').and.returnValue(
      of({ status: 200, iteration: iterationFake[0] })
    );
    // Act
    fixture.detectChanges();

    // Act
    component.saveUpdateIteration();

    // Assert
    // expect(buttonSave.length).toBe(0);
  });
});
