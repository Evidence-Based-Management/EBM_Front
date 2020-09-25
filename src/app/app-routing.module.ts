import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'iterations', component: ManageIterationsComponent },
  { path: 'iteration/:id', component: IterationComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
