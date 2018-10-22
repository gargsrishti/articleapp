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
  selector: 'app-newarticle',
  templateUrl: './newarticle.component.html',
  styleUrls: ['./newarticle.component.css']
})
export class NewarticleComponent implements OnInit {

  authForm: FormGroup;
  slug : string;
  article : Article;
  isUpdating : boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
    private fb: FormBuilder,
    private showArticle: ShowarticleService
  ) {
    this.authForm = this.fb.group({
      'title': ['', Validators.required],
      'description':['', Validators.required],
      'body': ['', Validators.required],
      'tagsList':['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {this.slug = params['slug'];
    }
  )
  this.showArticle.getSingleArticle(this.slug).subscribe (
    data => {
      this.article = data["article"];
      this.authForm.patchValue(this.article);
      this.isUpdating = true;
    },
    err => {
      console.log("an error occured during article fetching")
    }
  )

  }

  submitArticle() {
    const newArticle = this.authForm.value;
    this.showArticle.savearticle(newArticle)
    .subscribe(data =>
      {
        this.router.navigateByUrl('/article/' + data["article"].slug);
      },
      err => {console.log(err)});
  }

}
