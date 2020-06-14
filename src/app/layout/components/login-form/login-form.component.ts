import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) { }
  OnSubmit() {
    console.log(this.loginForm.value)
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      pass: ['', Validators.required],
      rememberme:[true]
    });
  }
  get rememberme() {
   return this.loginForm.get("rememberme")
 }
  get login() {
    return this.loginForm.get("login")
  }
  get pass() {
    return this.loginForm.get("pass")
  }
}
