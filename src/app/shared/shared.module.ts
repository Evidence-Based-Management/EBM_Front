import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './home/loader/loader.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';

@NgModule({
  declarations: [LoaderComponent, SidenavComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, SidenavComponent],
})
export class SharedModule {}
