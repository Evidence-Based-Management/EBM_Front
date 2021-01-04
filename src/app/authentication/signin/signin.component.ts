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
  constructor(private userHttp: AuthService, public router: Router) {}

  ngOnInit(): void {}
  signup(): any {
    this.userHttp.sigin(this.user).subscribe((response) => {
      if (response === true) {
        this.router.navigate(['/iterations']);
      }
    });
  }
}
