export interface Iterations {
  iterations: Iteration[];
}

export interface Iteration {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  state: string;
  KVM: KVM;
}

export interface KVM {
  CV: CV;
  T2M: T2M;
  A2I: A2I;
  UV: UV;
}

export interface CV {
  id: string;
  Revenue_Per_Employee: string;
  Product_Cost_Ratio: string;
  Employee_Satisfaction: string;
  Customer_Satisfaction: string;
  Customer_Usage_Index: string;
}

export interface T2M {
  id: string;
  Build_And_Integration_Frequency: string;
  Release_Frequency: string;
  Release_Stabilization_Period: string;
  Mean_Time_To_Repair: string;
  Cycle_Time: string;
  Lead_Time: string;
  Time_To_Learn: string;
}

export interface A2I {
  id: string;
  Feature_Usage_Index: string;
  Innovation_Rate: string;
  Defect_Trends: string;
  On_Product_Index: string;
  Installed_Version_Index: string;
  Technical_Debt: string;
  Production_Incident_Trends: string;
  Active_Code_Branches: string;
  Time_Spent_Context_Switching: string;
}

export interface UV {
  id: string;
  Market_Share: string;
  Customer_Or_User_Satisfaction_Gap: string;
}
