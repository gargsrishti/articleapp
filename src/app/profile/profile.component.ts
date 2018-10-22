import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { User } from '../models/user.model';
import { Article } from '../models/articles.model';
import { ShowarticleService } from '../shared/showarticle.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentsService } from '../shared/comments.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user : User;
  articles : Article[];
  favs: Article[];
  username: string;
  isEditable: boolean = true;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private showArticles: ShowarticleService,
    private commentService: CommentsService) {  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        this.username = params['username'];
        this.loadArticles();
        this.loadUser();
        this.loadFavouriteArticles();
        
      },
      err => {console.log("Error parsing user name from params")}
    )
    
    this.authService.currentUser.subscribe(data=>{this.isEditable = this.username === data.username})

    
  }

    loadUser() {
      this.authService.getUser().subscribe(
        data => {
                  this.user = data["user"]; console.log(this.user);
                },
        err => {console.log(err)}
      );
    }

    loadArticles(){
      console.log(this.username)
    this.showArticles.getArticleUser(this.username).subscribe(
      data => {this.articles = data["articles"];
      console.log(this.articles);
    },
    err=> {"Error parsing articles in profile.ts load articles function"})
    }

    loadFavouriteArticles(){
      console.log(this.username)
    this.showArticles.getFavoriteArticle(this.username).subscribe(
      data => {this.favs = data["articles"];
      console.log(this.articles);
    },
    err=> {"Error parsing articles in profile.ts load articles function"})
    }
}
