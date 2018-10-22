import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import {AuthService} from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authForm: FormGroup;
  isAuthenticated: boolean = false;

  user = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password':['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(
      data => {
        this.isAuthenticated = data; console.log(this.isAuthenticated);
        this.authService.getUser().subscribe(data => {console.log(data)});
      });
  }

  submitForm() {
    const credentials=this.authForm.value;
    this.authService.login(credentials).subscribe(
      data=> console.log(data),
      err=> console.log(err.error.errors)
    );
    this.router.navigateByUrl('/');
  };
}
