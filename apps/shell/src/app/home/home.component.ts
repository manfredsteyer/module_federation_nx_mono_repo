import { Component, OnInit } from '@angular/core';
import { AuthService } from 'auth-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.login('Demo-User', null);
  }

}
