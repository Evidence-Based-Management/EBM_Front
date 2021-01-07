import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Interfaces/user';
import { AuthService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: User = {
    username: null,
    password: null,
    confirm_password: null,
    email: null,
  };
  validationUserName: boolean;
  validationPassword: boolean;
  validationEmptyUserName: boolean;
  validationEmptyPassword: boolean;
  validationEmptyConfirmPassword: boolean;
  validationEmptyEmail: boolean;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {
    const body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-gradient-primary');
  }

  signup(): void {
    if (!this.checkEmpty()) {
      return;
    }

    if (!this.validationPassword) {
      delete this.user.confirm_password;
      this.user.idRol = 2;

      this.auth.signup(this.user).subscribe((response) => {
        if (response === true) {
          this.router.navigate(['/signin']);
        }
      });
    }
  }

  checkEmpty(): boolean {
    if (this.user.username === '' || this.user.username === null) {
      this.validationEmptyUserName = true;
      return false;
    } else {
      this.validationEmptyUserName = false;
    }

    if (this.user.email === '' || this.user.email === null) {
      this.validationEmptyEmail = true;
      return false;
    } else {
      this.validationEmptyEmail = false;
    }
    console.log(this.user.password);

    if (this.user.password === '' || this.user.password === null) {
      this.validationEmptyPassword = true;
      return false;
    } else {
      this.validationEmptyPassword = false;
    }
    if (
      this.user.confirm_password === '' ||
      this.user.confirm_password === null
    ) {
      this.validationEmptyConfirmPassword = true;
      return false;
    } else {
      this.validationEmptyConfirmPassword = false;
    }
    return true;
  }

  checkPasswords(): void {
    this.checkEmpty();
    this.validationPassword =
      this.user.password === this.user.confirm_password ? false : true;
  }
  checkUserName(): void {
    this.checkEmpty();
    this.auth.checkUserName(this.user.username).subscribe((response) => {
      this.validationUserName = !response;
    });
  }
}
