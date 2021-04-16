import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IterationComponent } from './manage-iterations/iteration/iteration.component';
import { ManageIterationsComponent } from './manage-iterations/manage-iterations.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './account/profile/profile.component';
import { TeamComponent } from './team/team.component';
import { CheckTokenGuard } from '../services/guards/check-token.guard';
import { NewProductComponent } from './product/new-product/new-product.component';
import { NewTeamComponent } from './team/new-team/new-team.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'iterations',
    component: ManageIterationsComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'iteration/:id',
    component: IterationComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'addIteration',
    component: IterationComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'products',
    component: ProductComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'teams',
    component: TeamComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [CheckTokenGuard],
  },

  {
    path: 'addProduct',
    component: NewProductComponent,
    canActivate: [CheckTokenGuard],
  },
  {
    path: 'addTeam',
    component: NewTeamComponent,
    canActivate: [CheckTokenGuard],
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppPagesModule {}
