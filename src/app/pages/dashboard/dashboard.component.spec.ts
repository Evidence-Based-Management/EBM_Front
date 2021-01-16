import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ProductService } from 'src/app/services/products/product.service';
import { IterationsService } from '../../services/iterations/iterations.service';
import { IterationCardComponent } from '../manage-iterations/iteration-card/iteration-card.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let productService: ProductService;
  let iterationService: IterationsService;

  const fakeProduct = [
    {
      id: 1,
      name: 'Kioskos',
      startDate: '2021-01-08T22:03:00',
      idTeam: 2,
      idUser: 1,
      team: {
        id: 2,
        name: 'Pacman',
        dateJoin: '2020-01-01T05:00:00',
        idUser: 1,
      },
    },
  ];

  const fakeIterations = {
    id: 2,
    name: 'Increibles',
    dateJoin: '2020-01-01T05:00:00',
    iterations: [
      {
        id: 2,
        name: 'Iteration 1',
        goal: 'My goal',
        startDate: '2020-10-01T05:00:00',
        endDate: '2020-10-21T05:00:00',
        state: 'Completed',
        kva: {
          kvaUnrealizedValue: {
            id: 1,
            marketShare: '3%',
            customerSatisfactionGap: '5/10',
            idTeam: 2,
            idIteration: 2,
          },
          kvaCurrentValue: {
            id: 1,
            revenuePerEmployee: '8.500.000 COP',
            productCostRatio: '500.000.000 - 100.000.000 COP',
            employeeSatisfaction: '4/5',
            customerSatisfaction: '3/5',
            customerUsageIndex: '50/180 min',
          },
          kvaAbilityToInnovate: {
            id: 2,
            featureUsageIndex: [
              '30 min by day',
              '5 min by day',
              '60 min by day',
            ],
            innovationRate: '0.33',
            defectTrends: '+60',
            onProductIndex: '80%',
            installedVersionIndex: '2',
            technicalDebt: '2 month',
            productionIncidentTrends: '3 times by iteration',
            activeCodeBranchesTimeSpentMergingCodeBetweenBranches: '5 hours',
            timeSpentContextSwitching: '3',
          },
          kvaTimeToMarket: {
            id: 1,
            buildAndIntegrationFrequency: '10 by week',
            releaseFrequency: 'Monthly',
            releaseStabilizationPeriod: '3 days',
            meanTimeToRepair: '3/5',
            cycleTime: '1 month',
            leadTime: '3 months',
            timeToLearn: '1 months',
          },
        },
      },
    ],
  };

  const fakeLastIteration = {
    id: 2,
    name: 'Increibles',
    dateJoin: '2020-01-01T05:00:00',
    iterations: [
      {
        id: 2,
        name: 'Iteration 1',
        goal: 'My goal',
        startDate: '2020-10-01T05:00:00',
        endDate: '2020-10-21T05:00:00',
        state: 'Completed',
        kva: {
          kvaUnrealizedValue: {
            id: 1,
            marketShare: '3%',
            customerSatisfactionGap: '5/10',
            idTeam: 2,
            idIteration: 2,
          },
          kvaCurrentValue: {
            id: 1,
            revenuePerEmployee: '8.500.000 COP',
            productCostRatio: '500.000.000 - 100.000.000 COP',
            employeeSatisfaction: '4/5',
            customerSatisfaction: '3/5',
            customerUsageIndex: '50/180 min',
          },
          kvaAbilityToInnovate: {
            id: 2,
            featureUsageIndex: [
              '30 min by day',
              '5 min by day',
              '60 min by day',
            ],
            innovationRate: '0.33',
            defectTrends: '+60',
            onProductIndex: '80%',
            installedVersionIndex: '2',
            technicalDebt: '2 month',
            productionIncidentTrends: '3 times by iteration',
            activeCodeBranchesTimeSpentMergingCodeBetweenBranches: '5 hours',
            timeSpentContextSwitching: '3',
          },
          kvaTimeToMarket: {
            id: 1,
            buildAndIntegrationFrequency: '10 by week',
            releaseFrequency: 'Monthly',
            releaseStabilizationPeriod: '3 days',
            meanTimeToRepair: '3/5',
            cycleTime: '1 month',
            leadTime: '3 months',
            timeToLearn: '1 months',
          },
        },
      },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, IterationCardComponent],
      imports: [
        ReactiveFormsModule,
        BrowserAnimationsModule,
        FormsModule,
        MatInputModule,
        MatNativeDateModule,
        MatSelectModule,
      ],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getLastIterationByIdProduct: (idTeam: number) =>
              of(fakeLastIteration),
          },
        },
        {
          provide: ProductService,
          useValue: {
            getIterationsByPoduct: (idTeam: number) => of(fakeIterations),
            getProductByUser: () => of(fakeProduct),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    iterationService = TestBed.inject(IterationsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should getTeamsByUserId without data', () => {
    productService.getProductByUser = jasmine
      .createSpy()
      .and.returnValue(of([]));
    component.getTeamsByUserId();
    expect(component).toBeTruthy();
  });

  it('should changeProduct', () => {
    component.changeProduct();
    expect(component).toBeTruthy();
  });
});
