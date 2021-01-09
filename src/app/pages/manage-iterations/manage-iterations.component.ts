import { Component, OnInit } from '@angular/core';
import { Iteration, Iterations } from 'src/app/Interfaces/iterations';

import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-manage-iterations',
  templateUrl: './manage-iterations.component.html',
})
export class ManageIterationsComponent implements OnInit {
  iterationsToHtml: Iterations = { iterations: new Array<Iteration>() };

  constructor(
    public serviceProduct: ProductService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getIterations();
  }

  getIterations(): void {
    this.serviceProduct
      .getIterationsByPoduct(1)
      .subscribe((iteration: any) => {
        this.setLocalIterations(iteration);
      });
  }

  setLocalIterations(iteration: any): void {
    if ('iterations' in iteration) {
      iteration.iterations.sort(
        (iterationA: Iteration, iterationB: Iteration) => {
          if (iterationA.id > iterationB.id) {
            return -1;
          }
          if (iterationA.id < iterationB.id) {
            return 1;
          }
          // a must be equal to b
          return 0;
        }
      );
      for (let index = 0; index < iteration.iterations.length; index++) {
        this.iterationsToHtml.iterations.push(
          this.newIteration(iteration.iterations, index)
        );
      }
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
        CV: iteration[index].kva ? iteration[index].kva.CV : '',
        T2M: iteration[index].kva ? iteration[index].kva.T2M : '',
        A2I: iteration[index].kva ? iteration[index].kva.A2I : '',
        UV: iteration[index].kva ? iteration[index].kva.UV : '',
      },
    };
  }

  goToIterationDetails(id): void {
    this.router.navigate(['/iteration', id]);
  }
}
