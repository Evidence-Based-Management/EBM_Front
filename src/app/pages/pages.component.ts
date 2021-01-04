import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication/auth.service';
import { User } from '../Interfaces/user';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: [],
})
export class PagesComponent implements OnInit {
  title = 'Evidence Based Management';
  user: string;
  constructor(public auth: AuthService, public router: Router) {
    console.log(auth);

    this.user = auth.user;
  }
  ngOnInit(): void {
    this.loadScript('assets/js/menu.js');
  }

  loadScript(url: string): void {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
  logout(): void {
    this.auth.logout();
    this.router.navigate(['/sigin']);
  }
}
