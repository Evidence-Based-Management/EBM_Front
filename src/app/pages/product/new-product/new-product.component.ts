import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/Interfaces/product';
import { TeamsService } from '../../../services/teams/teams.service';
import { ProductService } from '../../../services/products/product.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/authentication/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  teamsSelect: any;
  teamIdControl = new FormControl('', Validators.required);
  teamNameControl = new FormControl('', Validators.required);
  teamStarDateControl = new FormControl('', Validators.required);

  constructor(
    private teams: TeamsService,
    private productService: ProductService,
    public router: Router,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.getTeamsByUserId();
  }

  getTeamsByUserId(): void {
    this.teams.getTeamsByUserId().subscribe((result) => {
      this.teamsSelect = result;
    });
  }
  saveNewProduct(): void {
    if (
      this.teamIdControl.status === 'VALID' &&
      this.teamNameControl.status === 'VALID' &&
      this.teamStarDateControl.status === 'VALID'
    ) {
      const product: Product = {
        id: null,
        idUser: this.auth.id,
        name: this.teamNameControl.value,
        startDate: new Date(this.teamStarDateControl.value),
        idTeam: Number(this.teamIdControl.value),
      };
      delete product.id;

      this.productService.save(product).subscribe((result) => {
        if (result) {
          this.router.navigate(['/products']);
        }
      });
    } else {
      swal.fire({
        title: 'Error!',
        text: 'Invalid data!',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    }
  }
}
