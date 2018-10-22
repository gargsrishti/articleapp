import { Component, OnInit } from '@angular/core';
import { ShowarticleService } from "../shared/showarticle.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/articles.model';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articles:Article[];
  feed: Article[];
  tagFeed: Article[];
  isAuthenticated: boolean;
  articlesCount: number;
  isTagSelected: boolean = false;
  constructor(
    private showArticle : ShowarticleService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.getGlobalFeeds(1);
    this.authService.isAuthenticated.subscribe(
      data=> {
        this.isAuthenticated=data; 
        if(this.isAuthenticated){this.getUserFeeds();}
      }

    )
  }

  getUserFeeds() {
    this.showArticle.getFeed().subscribe(
      (response) => { this.feed = response["articles"];}
     
    );
  }

  getGlobalFeeds(page) {
    this.showArticle.getArticle(page).subscribe(
      (response) => {
        this.articles = response["articles"];
        this.articlesCount = response["articlesCount"];
      }
      
    );
  }

  showFeedByTag(tag){
    this.isTagSelected = true;
    this.showArticle.getArticleByTag(tag).subscribe(
      (response) => {
        this.tagFeed = response["articles"];
      }
    )
  }

  setPage(page:number){
    this.getGlobalFeeds(page);
  }
}
