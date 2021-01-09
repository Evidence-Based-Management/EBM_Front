import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageIterationsComponent } from './manage-iterations.component';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { IterationCardComponent } from './iteration-card/iteration-card.component';
import { ProductService } from '../../services/products/product.service';

describe('ManageIterationsComponent', () => {
  let component: ManageIterationsComponent;
  let fixture: ComponentFixture<ManageIterationsComponent>;
  let productService: ProductService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageIterationsComponent, IterationCardComponent],
      providers: [
        {
          provide: ProductService,
          useValue: {
            getIterationsByPoduct: (idTeam: number) =>
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
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageIterationsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get at least iterations', () => {
    // Arrange
    spyOn(productService, 'getIterationsByPoduct').and.callThrough();
    fixture.detectChanges();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(1);
  });

  it('should get empty iterations', () => {
    // Arrange
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(of({}));
    fixture.detectChanges();
    // AA
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should get empty iterations - getIterations()', () => {
    // Arrange
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(of({}));
    fixture.detectChanges();

    // Act
    component.getIterations();

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
  });

  it('should has 2 iterations when call setLocalIterations()', () => {
    // Arrange
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
        {
          id: 3,
          name: 'Iteration 2',
          goal: 'Get 20% to new revenew',
          startDate: '2020-01-01T05:00:00',
          endDate: '2020-02-02T05:00:00',
          state: 'Completed',
          kva: {
            kvaUnrealizedValue: {
              id: 2,
              marketShare: '10%',
              customerSatisfactionGap: 'My uodate 1',
              idTeam: 2,
              idIteration: 3,
            },
            kvaCurrentValue: null,
            kvaAbilityToInnovate: null,
            kvaTimeToMarket: null,
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
    const fakeIterations = [
      {
        id: -1,
        name: 'Fake',
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
      {
        id: 3,
        name: 'Iteration 2',
        goal: 'Get 20% to new revenew',
        startDate: '2020-01-01T05:00:00',
        endDate: '2020-02-02T05:00:00',
        state: 'Completed',
        kva: {
          kvaUnrealizedValue: {
            id: 2,
            marketShare: '10%',
            customerSatisfactionGap: 'My uodate 1',
            idTeam: 2,
            idIteration: 3,
          },
          kvaCurrentValue: null,
          kvaAbilityToInnovate: null,
          kvaTimeToMarket: null,
        },
      },
    ];

    // Act
    const newIteration = component.newIteration(fakeIterations, 0);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
    expect(newIteration.id).toBe('-1');
    expect(newIteration.name).toBe('Fake');
  });

  it('should return a new Iteration - goToIterationDetails()', () => {
    // Arrange
    const fakeIterations = [
      {
        id: -1,
        name: 'Fake',
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
      {
        id: 3,
        name: 'Iteration 2',
        goal: 'Get 20% to new revenew',
        startDate: '2020-01-01T05:00:00',
        endDate: '2020-02-02T05:00:00',
        state: 'Completed',
        kva: {
          kvaUnrealizedValue: {
            id: 2,
            marketShare: '10%',
            customerSatisfactionGap: 'My uodate 1',
            idTeam: 2,
            idIteration: 3,
          },
          kvaCurrentValue: null,
          kvaAbilityToInnovate: null,
          kvaTimeToMarket: null,
        },
      },
    ];

    // Act
    const newIteration = component.newIteration(fakeIterations, 0);

    // Assert
    expect(component.iterationsToHtml.iterations.length).toBe(0);
    expect(newIteration.id).toBe('-1');
    expect(newIteration.name).toBe('Fake');
  });

  it('should return a new Iteration - goToIterationDetails() without KVM', () => {
    // Arrange
    const fakeIterations = [
      {
        id: -1,
        name: 'Fake',
        goal: 'My goal',
        startDate: '2020-10-01T05:00:00',
        endDate: '2020-10-21T05:00:00',
        state: 'Completed',
      },
      {
        id: 3,
        name: 'Iteration 2',
        goal: 'Get 20% to new revenew',
        startDate: '2020-01-01T05:00:00',
        endDate: '2020-02-02T05:00:00',
        state: 'Completed',
      },
    ];

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
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
          {
            id: 3,
            name: 'Iteration 2',
            goal: 'Get 20% to new revenew',
            startDate: '2020-01-01T05:00:00',
            endDate: '2020-02-02T05:00:00',
            state: 'Completed',
            kva: {
              kvaUnrealizedValue: {
                id: 2,
                marketShare: '10%',
                customerSatisfactionGap: 'My uodate 1',
                idTeam: 2,
                idIteration: 3,
              },
              kvaCurrentValue: null,
              kvaAbilityToInnovate: null,
              kvaTimeToMarket: null,
            },
          },
          {
            id: 4,
            name: 'Iteration 3',
            goal: 'Get 10% to new revenew',
            startDate: '2020-01-01T05:00:00',
            endDate: '2020-02-02T05:00:00',
            state: 'Completed',
            kva: {
              kvaUnrealizedValue: {
                id: 2,
                marketShare: '10%',
                customerSatisfactionGap: 'My uodate 1',
                idTeam: 2,
                idIteration: 3,
              },
              kvaCurrentValue: null,
              kvaAbilityToInnovate: null,
              kvaTimeToMarket: null,
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
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
            state: 'Fail',
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
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
            state: 'In_Progress',
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
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
            state: '',
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

  it('should have 1 button to create a new Iteration', () => {
    // Arrange
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(By.css('a'));

    // Assert
    expect(result.length).toBe(1);
  });

  it('should order iterations', () => {
    // Arrange
    spyOn(productService, 'getIterationsByPoduct').and.returnValue(
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
          },
          {
            id: 2,
            name: 'Iteration 1',
            goal: 'My goal',
            startDate: '2020-10-01T05:00:00',
            endDate: '2020-10-21T05:00:00',
            state: 'Completed',
          },
          {
            id: 7,
            name: 'Iteration 1',
            goal: 'My goal',
            startDate: '2020-10-01T05:00:00',
            endDate: '2020-10-21T05:00:00',
            state: 'Completed',
          },
          {
            id: 5,
            name: 'Iteration 1',
            goal: 'My goal',
            startDate: '2020-10-01T05:00:00',
            endDate: '2020-10-21T05:00:00',
            state: 'Completed',
          },
          {
            id: 0,
            name: 'Iteration 1',
            goal: 'My goal',
            startDate: '2020-10-01T05:00:00',
            endDate: '2020-10-21T05:00:00',
            state: 'Completed',
          },
        ],
      })
    );
    fixture.detectChanges();

    // Act
    const result = fixture.debugElement.queryAll(By.css('a'));

    // Assert
    expect(result.length).toBe(1);
  });
});
