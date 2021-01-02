import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './authentication/signin/signin.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { PagesComponent } from './pages/pages.component';
import { SigInGuard } from './services/guards/sig-in.guard';

const routes: Routes = [
  { path: 'sigin', component: SigninComponent },
  { path: 'sigup', component: SignupComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [SigInGuard],
    loadChildren: './pages/pages.module#PagesModule',
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
