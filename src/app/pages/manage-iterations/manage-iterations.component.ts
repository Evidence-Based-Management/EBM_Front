import { Component, OnInit } from '@angular/core';
import { Iteration, Iterations } from 'src/app/Interfaces/iterations';

import { Router } from '@angular/router';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-manage-iterations',
  templateUrl: './manage-iterations.component.html',
  styleUrls: ['./manage-iterations.component.css'],
})
export class ManageIterationsComponent implements OnInit {
  productsSelect: any;
  selected: any;
  iterationsToHtml: Iterations = { iterations: new Array<Iteration>() };

  constructor(
    public serviceProduct: ProductService,
    public router: Router,
    private products: ProductService
  ) {}

  ngOnInit(): void {
    this.getTeamsByUserId();
  }

  getTeamsByUserId(): void {
    this.products.getProductByUser().subscribe((result) => {
      if (result.length > 0) {
        this.selected = result[0].id;
        this.productsSelect = result;      
        this.getIterations();
      }
    });
  }

  getIterations(): void {
    this.serviceProduct
      .getIterationsByPoduct(this.selected)
      .subscribe((iteration: any) => {
        this.setLocalIterations(iteration);
      });
  }

  setLocalIterations(iteration: any): void {
    this.iterationsToHtml.iterations = new Array<Iteration>();
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
      idProduct: iteration[index].idProduct,
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

  changeProduct(): void {
    this.getIterations();
  }
}
