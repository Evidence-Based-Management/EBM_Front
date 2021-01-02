import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { IterationsService } from '../../services/iterations.service';
import { IterationCardComponent } from '../manage-iterations/iteration-card/iteration-card.component';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent, IterationCardComponent],
      providers: [
        {
          provide: IterationsService,
          useValue: {
            getLastIterationByTeam: (idTeam: number) =>
              of({
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
                        activeCodeBranchesTimeSpentMergingCodeBetweenBranches:
                          '5 hours',
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
              }),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
