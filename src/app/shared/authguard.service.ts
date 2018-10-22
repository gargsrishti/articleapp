import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthguardService implements CanActivate {
  authenticated: boolean = false;
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    this.auth.isAuthenticated.subscribe( data => {
      if (!data) {
        this.router.navigate(['signin']);
        return false;
      }
    })
    
    return true;
  }
}