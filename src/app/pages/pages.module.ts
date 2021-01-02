import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppPagesModule } from './pages.routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { IterationCardComponent } from './manage-iterations/iteration-card/iteration-card.component';
import { KeyValueMesuresComponent } from './manage-iterations/key-value-mesures/key-value-mesures.component';
import { NewIterationComponent } from './manage-iterations/iteration/new-iteration/new-iteration.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageIterationsComponent,
    IterationComponent,
    IterationCardComponent,
    KeyValueMesuresComponent,
    NewIterationComponent,
  ],
  imports: [
    CommonModule,
    AppPagesModule,
    HttpClientModule,
    MatTabsModule,
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [],
})
export class PagesModule {}
