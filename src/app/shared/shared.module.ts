import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './home/loader/loader.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LoaderComponent, SidenavComponent],
  imports: [RouterModule, CommonModule],
  exports: [LoaderComponent, SidenavComponent],
})
export class SharedModule {}
