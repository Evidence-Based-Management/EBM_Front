import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Iteration } from 'src/app/Interfaces/iterations';
import { IterationsService } from 'src/app/services/iterations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-iteration',
  templateUrl: './iteration.component.html',
})
export class IterationComponent implements OnInit {
  idIteration;
  iteration: Iteration;
  constructor(
    public serviceItertations: IterationsService,
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
            Customer_Satisfaction: null,
            Customer_Usage_Index: null,
            Employee_Satisfaction: null,
            Product_Cost_Ratio: null,
            Revenue_Per_Employee: null,
          },
          T2M: {
            Build_And_Integration_Frequency: null,
            Cycle_Time: null,
            Lead_Time: null,
            Mean_Time_To_Repair: null,
            Release_Frequency: null,
            Release_Stabilization_Period: null,
            Time_To_Learn: null,
          },
          A2I: {
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
        this.mapToIteration(response);
      });
  }

  mapToIteration(response: any): void {
    this.iteration = {
      id: response?.id ? response.id : '',
      name: response?.name ? response.name : '',
      goal: response?.goal ? response.goal : '',
      startDate: response?.startDate ? response.startDate : '',
      endDate: response?.endDate ? response.endDate : '',
      state: response?.state ? response.state : '',
      KVM: {
        A2I: {
          Active_Code_Branches: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate
                .activeCodeBranchesTimeSpentMergingCodeBetweenBranches
            : '',
          Defect_Trends: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.defectTrends
            : '',
          Feature_Usage_Index: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.featureUsageIndex
            : [],
          Innovation_Rate: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.innovationRate
            : '',
          Installed_Version_Index: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.installedVersionIndex
            : '',
          On_Product_Index: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.onProductIndex
            : '',
          Production_Incident_Trends: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.productionIncidentTrends
            : '',
          Technical_Debt: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.technicalDebt
            : '',
          Time_Spent_Context_Switching: response?.kva?.kvaAbilityToInnovate
            ? response.kva.kvaAbilityToInnovate.timeSpentContextSwitching
            : '',
        },
        CV: {
          Customer_Satisfaction: response?.kva?.kvaCurrentValue
            ? response.kva.kvaCurrentValue.customerSatisfaction
            : '',
          Customer_Usage_Index: response?.kva?.kvaCurrentValue
            ? response.kva.kvaCurrentValue.customerUsageIndex
            : '',
          Employee_Satisfaction: response?.kva?.kvaCurrentValue
            ? response.kva.kvaCurrentValue.employeeSatisfaction
            : '',
          Product_Cost_Ratio: response?.kva?.kvaCurrentValue
            ? response.kva.kvaCurrentValue.productCostRatio
            : '',
          Revenue_Per_Employee: response?.kva?.kvaCurrentValue
            ? response.kva.kvaCurrentValue.revenuePerEmployee
            : '',
        },
        T2M: {
          Build_And_Integration_Frequency: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.buildAndIntegrationFrequency
            : '',
          Cycle_Time: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.cycleTime
            : '',
          Lead_Time: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.leadTime
            : '',
          Mean_Time_To_Repair: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.meanTimeToRepair
            : '',
          Release_Frequency: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.releaseFrequency
            : '',
          Release_Stabilization_Period: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.releaseStabilizationPeriod
            : '',
          Time_To_Learn: response?.kva?.kvaTimeToMarket
            ? response.kva.kvaTimeToMarket.timeToLearn
            : '',
        },
        UV: {
          Customer_Or_User_Satisfaction_Gap: response?.kva?.kvaUnrealizedValue
            ? response.kva.kvaUnrealizedValue.customerSatisfactionGap
            : '',
          Market_Share: response?.kva?.kvaUnrealizedValue
            ? response.kva.kvaUnrealizedValue.marketShare
            : '',
        },
      },
    };
  }

  mapFromIteration(iteration: Iteration): any {
    return {
      goal: iteration.goal,
      name: iteration.name,
      startDate: iteration.startDate,
      endDate: iteration.endDate,
      state: 'In_Progress',
      idTeam: 2,
    };
  }

  saveIteration(): void {
    this.serviceItertations
      .save(this.mapFromIteration(this.iteration))
      .subscribe((response: any) => {
        this.router.navigate(['/iterations']);
      });
  }
}
