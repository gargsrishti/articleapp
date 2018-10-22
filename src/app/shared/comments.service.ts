import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comments.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import {AuthService} from '../shared/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http : HttpClient, private authService:AuthService) { 
    
  }

  loadComment(slug): Observable<Comment[]> {
    return this.http.get("https://conduit.productionready.io/api/articles/"+slug+"/comments")
    .pipe(map(
      data => {
        return data["comments"];
      }
    ));
  }

  add(slug, payload): Observable<Comment> {
    return this.http
    .post(
      'https://conduit.productionready.io/api/articles/'+ slug + '/comments',
      { comment: { body: payload } }, this.authService.getHeader()
    ).pipe(map(data => data["comment"]));
  }

  deleteComment(slug, id): Observable<any> {
    return this.http.delete('https://conduit.productionready.io/api/articles/'+ slug + '/comments/'+id,
    this.authService.getHeader());
  }
}
