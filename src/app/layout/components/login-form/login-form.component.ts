import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private auth:AuthService,private toastr: ToastrService,private router:Router) { }
  OnSubmit() {
    this.auth.login(this.loginForm.value).subscribe({
      next: d => {
        this.auth.storeToLocalStorage(d.token);
        this.toastr.success(d.message, "login")
        this.router.navigateByUrl("/vertical/default-dashboard")
      }, error: err => {
        this.toastr.error("invalid email or password");    
      }
    })
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberme:[true]
    });
  }
  get rememberme() {
   return this.loginForm.get("rememberme")
 }
  get email() {
    return this.loginForm.get("email")
  }
  get password() {
    return this.loginForm.get("password")
  }
}
