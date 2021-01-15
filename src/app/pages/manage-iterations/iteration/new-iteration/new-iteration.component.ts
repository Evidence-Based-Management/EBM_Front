import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/products/product.service';

@Component({
  selector: 'app-new-iteration',
  templateUrl: './new-iteration.component.html',
  styleUrls: ['./new-iteration.component.css'],
})
export class NewIterationComponent implements OnInit {
  productsSelect: any;
  teamIdControl = new FormControl('', Validators.required);
  @Input() iteration: any;

  constructor(private products: ProductService) {}

  ngOnInit(): void {
    this.getTeamsByUserId();
  }

  getTeamsByUserId(): void {
    this.products.getProductByUser().subscribe((result) => {
      this.productsSelect = result;
    });
  }
}
