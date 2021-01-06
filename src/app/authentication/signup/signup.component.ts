import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('bg-gradient-primary'); //add the class
  }
}
