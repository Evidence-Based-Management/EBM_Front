import { Component, OnInit } from '@angular/core';
import { Iteration, Iterations } from 'src/app/Interfaces/iterations';
import { IterationsService } from '../services/iterations.service';

@Component({
  selector: 'app-manage-iterations',
  templateUrl: './manage-iterations.component.html',
  styleUrls: ['./manage-iterations.component.css'],
})
export class ManageIterationsComponent implements OnInit {
  iterationsToHtml: Iterations = { iterations: new Array<Iteration>() };

  constructor(public serviceItertations: IterationsService) {}

  ngOnInit(): void {
    this.getIterations();
  }

  getIterations() {
    this.serviceItertations
      .getJsonIterations()
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
    };
  }
}
