import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteration } from 'src/app/Interfaces/iterations';
import { IterationsService } from 'src/app/services/iterations.service';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { IterationMappers } from 'src/app/utilities/mappers';
import { KVAUnrealizedValueService } from 'src/app/services/kvaunrealized-value.service';
import { KVACurrentValueService } from 'src/app/services/kvacurrent-value.service';
import { KVATimeToMarketService } from 'src/app/services/kvatime-to-market.service';
import { KVAAbilityToInnovateService } from 'src/app/services/kvaability-to-innovate.service';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
})
export class IterationComponent implements OnInit {
  idIteration;
  iteration: Iteration;
  constructor(
    public serviceItertations: IterationsService,
    public serviceKVAUnrealizedValue: KVAUnrealizedValueService,
    public serviceKVACurrentValue: KVACurrentValueService,
    public serviceKVATimeToMarket: KVATimeToMarketService,
    public serviceKVAAbilityToInnovate: KVAAbilityToInnovateService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.idIteration = this.route.snapshot.paramMap.get('id');

    if (this.idIteration) {
      this.getIteration();
    } else {
      this.iteration = {
        id: null,
        name: null,
        goal: null,
        state: 'newIteration',
        startDate: null,
        endDate: null,
        KVM: {
          CV: {
            id: null,
            Customer_Satisfaction: null,
            Customer_Usage_Index: null,
            Employee_Satisfaction: null,
            Product_Cost_Ratio: null,
            Revenue_Per_Employee: null,
          },
          T2M: {
            id: null,
            Build_And_Integration_Frequency: null,
            Cycle_Time: null,
            Lead_Time: null,
            Mean_Time_To_Repair: null,
            Release_Frequency: null,
            Release_Stabilization_Period: null,
            Time_To_Learn: null,
          },
          A2I: {
            id: null,
            Active_Code_Branches: null,
            Defect_Trends: null,
            Feature_Usage_Index: null,
            Innovation_Rate: null,
            Installed_Version_Index: null,
            On_Product_Index: null,
            Production_Incident_Trends: null,
            Technical_Debt: null,
            Time_Spent_Context_Switching: null,
          },
          UV: {
            id: null,
            Customer_Or_User_Satisfaction_Gap: null,
            Market_Share: null,
          },
        },
      };
    }
  }

  getIteration(): void {
    this.serviceItertations
      .getIterationById(this.idIteration)
      .subscribe((response: any) => {
        this.iteration = IterationMappers.mapToIteration(response);
      });
  }

  mapFromIteration(iteration: Iteration, newState: string): any {
    return {
      goal: iteration.goal,
      name: iteration.name,
      startDate: iteration.startDate,
      endDate: iteration.endDate,
      state: newState,
      idTeam: 2,
    };
  }

  saveIteration(): void {
    this.serviceItertations
      .save(this.mapFromIteration(this.iteration, 'In_Progress'))
      .subscribe((response: any) => {
        this.router.navigate(['/iterations']);
      });
  }
  updateIteration(state: string): void {
    this.iteration.state = state;
    this.serviceItertations
      .update(this.iteration.id, this.mapFromIteration(this.iteration, state))
      .subscribe((response: any) => {
        this.router.navigate(['/iterations']);
      });
  }

  saveKVA(): void {
    forkJoin([
      this.saveUnrealizedValue(),
      this.saveCurrentValue(),
      this.saveTimeToMarket(),
      this.saveAbilityToInnovate(),
    ]).subscribe((value) => {
      this.router.navigate(['/iterations']);
    });
  }

  saveUnrealizedValue(): Observable<any> {
    if (this.iteration.KVM.UV.id === '') {
      return this.serviceKVAUnrealizedValue.save(
        this.mapToKVAUnrealizedValue(this.iteration)
      );
    } else {
      return this.serviceKVAUnrealizedValue.update(
        this.iteration.KVM.UV.id,
        this.mapToKVAUnrealizedValue(this.iteration)
      );
    }
  }

  saveCurrentValue(): Observable<any> {
    if (this.iteration.KVM.CV.id === '') {
      return this.serviceKVACurrentValue.save(
        this.mapToKVACurrentValue(this.iteration)
      );
    } else {
      return this.serviceKVACurrentValue.update(
        this.iteration.KVM.CV.id,
        this.mapToKVACurrentValue(this.iteration)
      );
    }
  }

  saveTimeToMarket(): Observable<any> {
    const mappedTimeToMarket = this.mapToKVATimeToMarket(this.iteration);
    if (this.iteration.KVM.T2M.id === '') {
      return this.serviceKVATimeToMarket.save(mappedTimeToMarket);
    } else {
      return this.serviceKVATimeToMarket.update(
        this.iteration.KVM.T2M.id,
        mappedTimeToMarket
      );
    }
  }

  saveAbilityToInnovate(): Observable<any> {
    const mappedAbilityToInnovate = this.mapToKVAAbilityToInnovate(
      this.iteration
    );
    if (this.iteration.KVM.A2I.id === '') {
      return this.serviceKVAAbilityToInnovate.save(mappedAbilityToInnovate);
    } else {
      return this.serviceKVAAbilityToInnovate.update(
        this.iteration.KVM.A2I.id,
        mappedAbilityToInnovate
      );
    }
  }

  mapToKVAUnrealizedValue(iteration: Iteration): any {
    return {
      idIteration: iteration.id,
      idTeam: 2,
      customerSatisfactionGap:
        iteration.KVM.UV.Customer_Or_User_Satisfaction_Gap,
      marketShare: iteration.KVM.UV.Market_Share,
    };
  }

  mapToKVACurrentValue(iteration: Iteration): any {
    return {
      idIteration: iteration.id,
      idTeam: 2,
      customerSatisfaction: iteration.KVM.CV.Customer_Satisfaction,
      customerUsageIndex: iteration.KVM.CV.Customer_Usage_Index,
      employeeSatisfaction: iteration.KVM.CV.Employee_Satisfaction,
      productCostRatio: iteration.KVM.CV.Product_Cost_Ratio,
      revenuePerEmployee: iteration.KVM.CV.Revenue_Per_Employee,
    };
  }

  mapToKVATimeToMarket(iteration: Iteration): any {
    return {
      idIteration: iteration.id,
      idTeam: 2,
      buildAndIntegrationFrequency:
        iteration.KVM.T2M.Build_And_Integration_Frequency,
      cycleTime: iteration.KVM.T2M.Cycle_Time,
      leadTime: iteration.KVM.T2M.Lead_Time,
      meanTimeToRepair: iteration.KVM.T2M.Mean_Time_To_Repair,
      releaseFrequency: iteration.KVM.T2M.Release_Frequency,
      releaseStabilizationPeriod:
        iteration.KVM.T2M.Release_Stabilization_Period,
      timeToLearn: iteration.KVM.T2M.Time_To_Learn,
    };
  }
  mapToKVAAbilityToInnovate(iteration: Iteration): any {
    return {
      idIteration: iteration.id,
      idTeam: 2,
      activeCodeBranchesTimeSpentMergingCodeBetweenBranches:
        iteration.KVM.A2I.Active_Code_Branches,
      defectTrends: iteration.KVM.A2I.Defect_Trends,
      featureUsageIndex: iteration.KVM.A2I.Feature_Usage_Index,
      innovationRate: iteration.KVM.A2I.Innovation_Rate,
      installedVersionIndex: iteration.KVM.A2I.Installed_Version_Index,
      onProductIndex: iteration.KVM.A2I.On_Product_Index,
      productionIncidentTrends: iteration.KVM.A2I.Production_Incident_Trends,
      technicalDebt: iteration.KVM.A2I.Technical_Debt,
      timeSpentContextSwitching: iteration.KVM.A2I.Time_Spent_Context_Switching,
    };
  }
}
