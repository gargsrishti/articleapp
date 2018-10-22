import { Component, OnInit } from '@angular/core';
import { ShowarticleService} from '../shared/showarticle.service'
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/articles.model';
import { CommentsService } from '../shared/comments.service';
import { FormControl } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { Comment } from '../models/comments.model';

@Component({
  selector: 'app-singlearticle',
  templateUrl: './singlearticle.component.html',
  styleUrls: ['./singlearticle.component.css']
})
export class SinglearticleComponent implements OnInit {
  article: Article;
  slug: string;
  canModify : boolean;
  comments: Comment[];
  commentControl = new FormControl();
  isAuthenticated: boolean = false;
  username: string;
  constructor(private showArticle : ShowarticleService,
    private route: ActivatedRoute,
    private router: Router, private commentService:CommentsService,
    private authService: AuthService
    ) { }

  ngOnInit() {
    this.authService.isAuthenticated.subscribe(
      data => {
        this.isAuthenticated = data; console.log(this.isAuthenticated);
        this.authService.getUser().subscribe(data => {console.log(data); this.username=data["user"].username});
      });

    this.route.params.subscribe(
        params => {this.slug = params['slug'];}
    )
    this.showArticle.getSingleArticle(this.slug).subscribe(
      data=>{
        
        this.article = data["article"];
        console.log(this.article);
        if(this.article.author.username === this.username){
          this.canModify = true;
        }
        else this.canModify = false;
      },
      err => {console.log(err)}
    );
    this.loadComments();
  }

  deleteArticle() {
    this.showArticle.deleteArticle(this.article.slug)
      .subscribe(
        data => {
          this.router.navigateByUrl('/');
        }
      );
  }

  loadComments() {
    this.commentService.loadComment(this.slug).subscribe(
      data => {this.comments = data; console.log(this.comments)}
    )
  }

  addComment() {
    const commentBody = this.commentControl.value;
    this.commentService
      .add(this.article.slug, commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentControl.reset('');
        },
        errors => {
          console.log(errors)
        }
      );
  }
}