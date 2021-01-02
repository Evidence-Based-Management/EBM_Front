import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';
import { SigInGuard } from '../services/guards/sig-in.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [SigInGuard],
  },
  {
    path: 'iterations',
    component: ManageIterationsComponent,
    canActivate: [SigInGuard],
  },
  {
    path: 'iteration/:id',
    component: IterationComponent,
    canActivate: [SigInGuard],
  },
  {
    path: 'addIteration',
    component: IterationComponent,
    canActivate: [SigInGuard],
  },
  { path: '', redirectTo: '/iterations', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesModule {}
