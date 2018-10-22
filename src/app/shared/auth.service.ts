import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { map, distinctUntilChanged} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient
  ) {
    if (this.getToken()) {
      this.getUser().subscribe(
        (data) =>{
          this.setAuth(data["user"])
        }
        ,
        (err)=>{
          console.log(err)
          this.deleteAuth();
        }
      )
    }else{
      this.deleteAuth();
    }
  }

  setAuth(user: User) {
    this.saveToken(user.token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  deleteAuth() {
    this.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
  }

  register(credentials): Observable<User> {
    return this.http.post("https://conduit.productionready.io/api/users", {
      user:
      {
        email: credentials.email,
        password: credentials.password,
        username: credentials.username
      }
    })
      .pipe(map(
        data => {
          this.setAuth(data["user"]);
          return data;
        }
      ));
    //console.log(this.user.user.token);
  }

  login(credentials): Observable<User> {
    console.log(credentials)
    return this.http.post("https://conduit.productionready.io/api/users/login", {
      user:
      {
        email: credentials.email,
        password: credentials.password
      }
    })
      .pipe(map(
        data => {
          console.log(data)
          this.setAuth(data["user"]);
          return data;
        }
      ));
    //console.log(this.user.user.token);
  }

  getUser() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + this.getToken() });
      console.log(headers)
    let options = { headers: headers };
    return this.http.get("https://conduit.productionready.io/api/user", options)
    //commente dout .subscribe
  }

  getHeader() :any {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': "Token " + this.getToken() });
      console.log(headers)
    let options = { headers: headers };
    return options;
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  update(user): Observable<User> {
    return this.http
      .put('/user', { user })
      .pipe(map(data => {
        this.currentUserSubject.next(data["user"]);
        return data["user"];
      }));
  }

  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }

  updateUser(newValues) : Observable<any> {
    return this.http.put("https://conduit.productionready.io/api/user",newValues, this.getHeader())
  }
}