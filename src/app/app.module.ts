import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { PrincipalComponent } from './home/principal/principal.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ManageIterationsComponent } from './home/manage-iterations/manage-iterations.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    PrincipalComponent,
    DashboardComponent,
    ManageIterationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
