import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'demo-user',
  templateUrl: './user.component.html',
  // styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  get userName(): string {
    return this.authService.userName;
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
