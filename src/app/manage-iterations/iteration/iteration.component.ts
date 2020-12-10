import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteration } from 'src/app/Interfaces/iterations';
import { IterationsService } from 'src/app/services/iterations.service';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
})
export class IterationComponent implements OnInit {
  idIteration;
  iteration: Iteration;
  constructor(
    public serviceItertations: IterationsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idIteration = this.route.snapshot.paramMap.get('id');
    this.getIteration();
  }

  getIteration(): void {
    this.serviceItertations
      .getIterationById(this.idIteration)
      .subscribe((response: any) => {
        this.mapIteration(response);
      });
  }

  mapIteration(response: any): void {
    if ('id' in response) {
      this.iteration = {
        id: response.id ? response.id : '',
        name: response.name ? response.name : '',
        goal: response.goal ? response.goal : '',
        startDate: response.startDate ? response.startDate : '',
        endDate: response.endDate ? response.endDate : '',
        state: response.state ? response.state : '',
        KVM: {
          A2I: {
            Active_Code_Branches: response.kva
              ? response.kva.kvaAbilityToInnovate
                  .activeCodeBranchesTimeSpentMergingCodeBetweenBranches
              : '',
            Defect_Trends: response.kva
              ? response.kva.kvaAbilityToInnovate.defectTrends
              : '',
            Feature_Usage_Index: response.kva
              ? response.kva.kvaAbilityToInnovate.featureUsageIndex
              : [],
            Innovation_Rate: response.kva
              ? response.kva.kvaAbilityToInnovate.innovationRate
              : '',
            Installed_Version_Index: response.kva
              ? response.kva.kvaAbilityToInnovate.installedVersionIndex
              : '',
            On_Product_Index: response.kva
              ? response.kva.kvaAbilityToInnovate.onProductIndex
              : '',
            Production_Incident_Trends: response.kva
              ? response.kva.kvaAbilityToInnovate.productionIncidentTrends
              : '',
            Technical_Debt: response.kva
              ? response.kva.kvaAbilityToInnovate.technicalDebt
              : '',
            Time_Spent_Context_Switching: response.kva
              ? response.kva.kvaAbilityToInnovate.timeSpentContextSwitching
              : '',
          },
          CV: {
            Customer_Satisfaction: response.kva
              ? response.kva.kvaCurrentValue.customerSatisfaction
              : '',
            Customer_Usage_Index: response.kva
              ? response.kva.kvaCurrentValue.customerUsageIndex
              : '',
            Employee_Satisfaction: response.kva
              ? response.kva.kvaCurrentValue.employeeSatisfaction
              : '',
            Product_Cost_Ratio: response.kva
              ? response.kva.kvaCurrentValue.productCostRatio
              : '',
            Revenue_Per_Employee: response.kva
              ? response.kva.kvaCurrentValue.revenuePerEmployee
              : '',
          },
          T2M: {
            Build_And_Integration_Frequency: response.kva
              ? response.kva.kvaTimeToMarket.buildAndIntegrationFrequency
              : '',
            Cycle_Time: response.kva
              ? response.kva.kvaTimeToMarket.cycleTime
              : '',
            Lead_Time: response.kva
              ? response.kva.kvaTimeToMarket.leadTime
              : '',
            Mean_Time_To_Repair: response.kva
              ? response.kva.kvaTimeToMarket.meanTimeToRepair
              : '',
            Release_Frequency: response.kva
              ? response.kva.kvaTimeToMarket.releaseFrequency
              : '',
            Release_Stabilization_Period: response.kva
              ? response.kva.kvaTimeToMarket.releaseStabilizationPeriod
              : '',
            Time_To_Learn: response.kva
              ? response.kva.kvaTimeToMarket.timeToLearn
              : '',
          },
          UV: {
            Customer_Or_User_Satisfaction_Gap: response.kva
              ? response.kva.kvaUnrealizedValue.customerSatisfactionGap
              : '',
            Market_Share: response.kva
              ? response.kva.kvaUnrealizedValue.marketShare
              : '',
          },
        },
      };
    }
  }

  saveUpdateIteration(): void {
    this.serviceItertations
      .updateIteration(this.iteration)
      .subscribe((response: any) => {
        // this.iteration = response[0];
        // console.log(response);
      });
  }
}
