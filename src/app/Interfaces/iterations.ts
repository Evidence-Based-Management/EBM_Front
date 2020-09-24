export interface Iterations {
  iterations: Iteration[];
}

export interface Iteration {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: string;
}
