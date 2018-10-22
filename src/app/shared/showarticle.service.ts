import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from '../models/articles.model';
import { Observable } from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class ShowarticleService {

  constructor(private http:HttpClient, 
    private httpClient: HttpClient, 
    private authService: AuthService) { 
  }

  getSingleArticle(slug): Observable<Article> {
    return this.httpClient.get('https://conduit.productionready.io/api/articles/'+slug);
  }

  getArticleByTag(tag): Observable<Article> {
    return this.httpClient.get('https://conduit.productionready.io/api/articles?tag='+tag);
  }
  getArticle(page) {
    return this.http.get('https://conduit.productionready.io/api/articles?offset='+page);
  }
  getArticleUser(username) {
    return this.http.get('https://conduit.productionready.io/api/articles?author=' + username);
  }
  getFavoriteArticle(username) {
    return this.http.get('https://conduit.productionready.io/api/articles?favorited=' + username);
  }

  getFeed() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + this.authService.getToken() });
  let options = { headers: headers };
    return this.httpClient.get("https://conduit.productionready.io/api/articles/feed", options)
  }


  savearticle(newarticle) : Observable<any>{
    //console.log( this.authService.getHeader());
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + this.authService.getToken() });
      console.log(headers)
    let options = { headers: headers };  
    return this.httpClient.post("https://conduit.productionready.io/api/articles", {
    article: {
      title: newarticle.title,
      description: newarticle.description,
      body: newarticle.body,
      tagList: newarticle.tagsList.split(",")
    }
    }, options);
      
}

  deleteArticle(slug) : Observable<any>{
    return this.httpClient.delete('https://conduit.productionready.io/api/articles/' + slug, this.authService.getHeader());
  }

}
