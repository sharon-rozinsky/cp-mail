import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.css']
})
export class LoginScreenComponent implements OnInit {

  constructor(private router: Router) { }

  onSubmit(email: string) {
    console.log('email: ', email);
    this.router.navigate(['/mail-viewer', email]);
  }

  ngOnInit() {
  }

}
