import { Component, OnInit } from '@angular/core';
import { Iteration, Iterations } from 'src/app/Interfaces/iterations';
import { IterationsService } from '../services/iterations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-iterations',
  templateUrl: './manage-iterations.component.html',
})
export class ManageIterationsComponent implements OnInit {
  iterationsToHtml: Iterations = { iterations: new Array<Iteration>() };

  constructor(
    public serviceItertations: IterationsService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getIterations();
  }

  getIterations(): void {
    this.serviceItertations
      .getIterations()
      .subscribe((iteration: Iterations) => {
        this.setLocalIterations(iteration);
      });
  }

  setLocalIterations(iteration: Iterations): void {
    for (let index = 0; index < iteration.iterations.length; index++) {
      this.iterationsToHtml.iterations.push(
        this.newIteration(iteration, index)
      );
    }
  }

  newIteration(iteration: Iterations, index: number): Iteration {
    return {
      id: iteration.iterations[index].id.toString(),
      name: iteration.iterations[index].name,
      goal: iteration.iterations[index].goal,
      startDate: iteration.iterations[index].startDate,
      endDate: iteration.iterations[index].endDate,
      status: iteration.iterations[index].status,
      KVM: {
        CV: iteration.iterations[index].KVM.CV,
        T2M: iteration.iterations[index].KVM.T2M,
        A2I: iteration.iterations[index].KVM.A2I,
        UV: iteration.iterations[index].KVM.UV,
      },
    };
  }

  goToIterationDetails(id): void {
    this.router.navigate(['/iteration', id]);
  }
}
