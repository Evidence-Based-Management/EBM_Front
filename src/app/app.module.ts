import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { IterationCardComponent } from './manage-iterations/iteration-card/iteration-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTabsModule } from '@angular/material/tabs';
import { KeyValueMesuresComponent } from './manage-iterations/key-value-mesures/key-value-mesures.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    ManageIterationsComponent,
    IterationComponent,
    IterationCardComponent,
    KeyValueMesuresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
