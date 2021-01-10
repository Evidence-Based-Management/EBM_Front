import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../../Interfaces/product';
import { ProductService } from '../../services/products/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'idTeam', 'startDate'];
  dataSource = new MatTableDataSource<Product>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private product: ProductService) {
    product.getProductByUser().subscribe((result) => {
      console.log(result);

      this.dataSource.data = result;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
