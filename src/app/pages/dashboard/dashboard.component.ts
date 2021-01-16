import { Component, OnInit } from '@angular/core';
import { IterationsService } from '../../services/iterations/iterations.service';
import { Iteration } from '../../Interfaces/iterations';
import { IterationMappers } from '../../utilities/mappers';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls : ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  productsSelect: any;
  selected: any;
  iteration: Iteration;

  constructor(
    public serviceItertations: IterationsService,
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
        this.getLastIterationByProduct();
      }
    });
  }

  getLastIterationByProduct(): void {
    this.serviceItertations
      .getLastIterationByIdProduct(this.selected)
      .subscribe((iteration) => {
        this.iteration = IterationMappers.mapToIteration(iteration);
      });
  }

  changeProduct(): void {
    this.getLastIterationByProduct();
  }
}
