import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';
import { SignInGuard } from '../services/guards/sign-in.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'iterations',
    component: ManageIterationsComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'iteration/:id',
    component: IterationComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'addIteration',
    component: IterationComponent,
    canActivate: [SignInGuard],
  },
  { path: '', redirectTo: '/iterations', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesModule {}
