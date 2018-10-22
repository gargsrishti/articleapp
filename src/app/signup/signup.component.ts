import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import {AuthService} from '../shared/auth.service';
import {Errors} from '../models/errors.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  authForm: FormGroup;
  isAuthenticated: boolean = false;
  errors = {};
  hasErrors: boolean = false;
  //errors: Errors = {errors: {}};

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      'email': ['', Validators.required],
      'password':['', Validators.required],
      'username':['', Validators.required]
    });
    console.log(this.authForm["email"]);
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
    this.authService.register(credentials).subscribe(
      data=> {
        console.log(data);
        this.router.navigateByUrl('/');
        this.hasErrors = false;
      },
      err=> {
        this.hasErrors = true;
      }
    );
    
  };
}
