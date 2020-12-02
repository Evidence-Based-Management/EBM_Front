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
      .getIterationsByTeam(2)
      .subscribe((iteration: any) => {
        console.log(iteration);

        this.setLocalIterations(iteration);
      });
  }

  setLocalIterations(iteration: any): void {
    console.log(iteration.length);

    for (let index = 0; index < iteration.length; index++) {
      this.iterationsToHtml.iterations.push(
        this.newIteration(iteration, index)
      );
    }
  }

  newIteration(iteration: any, index: number): Iteration {
    return {
      id: iteration[index].id.toString(),
      name: iteration[index].name,
      goal: iteration[index].goal,
      startDate: iteration[index].startDate,
      endDate: iteration[index].endDate,
      state: iteration[index].state,
      KVM: {
        CV: iteration[index].KVM ? iteration[index].KVM.CV : '',
        T2M: iteration[index].KVM ? iteration[index].KVM.T2M : '',
        A2I: iteration[index].KVM ? iteration[index].KVM.A2I : '',
        UV: iteration[index].KVM ? iteration[index].KVM.UV : '',
      },
    };
  }

  goToIterationDetails(id): void {
    this.router.navigate(['/iteration', id]);
  }
}
