import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  isAuthenticated: boolean = false;
  constructor(
    private authservice: AuthService
  ) { }

  ngOnInit() {
    this.authservice.isAuthenticated.subscribe(
      data => {
        this.isAuthenticated = data; console.log(this.isAuthenticated);
        this.authservice.getUser().subscribe(data => {this.username = data["user"].username});
    
      }
    )
  }
}
