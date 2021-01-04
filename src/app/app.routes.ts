import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { PagesComponent } from './pages/pages.component';
import { SignInGuard } from './services/guards/sign-in.guard';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [SignInGuard],
    loadChildren: () =>
      import('./pages/pages.module').then((mod) => mod.PagesModule),
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
