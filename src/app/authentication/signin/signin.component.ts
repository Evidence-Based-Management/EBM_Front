import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Interfaces/user';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user: User = { username: null, password: null };
  errorMessage: string;
  constructor(private userHttp: AuthService, public router: Router) {}

  ngOnInit(): void {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-gradient-primary'); //add the class
  }
  signin(): any {
    this.userHttp.signin(this.user).subscribe((response) => {
      if (response === true) {
        this.router.navigate(['/iterations']);
      } else {
        this.errorMessage = 'User or password was incorrect!';
      }
    });
  }
}
