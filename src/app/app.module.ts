import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { MatSelectModule } from '@angular/material/select';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

import { KeyValueMesuresComponent } from './manage-iterations/key-value-mesures/key-value-mesures.component';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { LoaderComponent } from './home/loader/loader.component';
import { NewIterationComponent } from './manage-iterations/iteration/new-iteration/new-iteration.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    DashboardComponent,
    ManageIterationsComponent,
    IterationComponent,
    IterationCardComponent,
    KeyValueMesuresComponent,
    LoaderComponent,
    NewIterationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
