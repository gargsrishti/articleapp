import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import {Article} from '../models/articles.model';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';
import {AuthService} from '../shared/auth.service';
import {ShowarticleService} from '../shared/showarticle.service';
import { ArticleComponent } from '../article/article.component';


@Component({
  selector: 'app-settingpage',
  templateUrl: './settingpage.component.html',
  styleUrls: ['./settingpage.component.css']
})
export class SettingpageComponent implements OnInit {
  settingsForm: FormGroup;
  user : User;
  isAuthenticated: boolean = false;
  constructor(private authService : AuthService, private route: ActivatedRoute,
    private router: Router, private fb: FormBuilder) { 
      this.settingsForm = this.fb.group({
        image: '',
        username: '',
        bio: '',
        email: '',
        password: ''
    })
  }
  
  ngOnInit() {
    this.authService.isAuthenticated.subscribe(
      data => {
        this.isAuthenticated = data; console.log(this.isAuthenticated);
        this.authService.getUser().subscribe(data => {console.log(data)});
      });
    this.authService.getUser().subscribe(
      data => {this.settingsForm.patchValue(data["user"])}
    );
    //this.settings.patchValue(this.authService.getCurrentUser());
  }

  logout(){
    this.authService.deleteAuth();
    this.router.navigateByUrl('/');
  }

  updateSettings() {
    const newValues = this.settingsForm.value;
    this.authService.updateUser(newValues)
    .subscribe(data =>
      {
        this.router.navigateByUrl('/profile/' + newValues.username);
      },
      err => {console.log(err)});
  }

}
