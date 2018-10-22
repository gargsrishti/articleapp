import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { CommentsService } from '../shared/comments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Comment } from '../models/comments.model'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  canDelete : boolean;
  constructor(private authService : AuthService, private commentService: CommentsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.authService.currentUser.subscribe(
      data=>{this.canDelete = (this.comment.author.username === data.username);
      console.log("Delete is set to " + this.canDelete)}
    )
  }

  deleteComment( id: number) {
    let slug: string;
    //let id: number;
    this.route.params.subscribe(
      params => {slug = params['slug'];
                  }
    )
    this.commentService.deleteComment(slug, id).subscribe(
      data=>{this.router.navigateByUrl('/article/'+slug);}
    )
  }

}
