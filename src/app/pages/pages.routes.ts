import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';
import { SignInGuard } from '../services/guards/sign-in.guard';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './account/profile/profile.component';
import { TeamComponent } from './team/team.component';

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
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'teams',
    component: TeamComponent,
    canActivate: [SignInGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [SignInGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesModule {}
