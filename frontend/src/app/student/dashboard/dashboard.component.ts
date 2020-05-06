import { Component, OnInit } from '@angular/core';
import { UserService } from './../../shared/services/user/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private userService: UserService) { }

  public userData: any;

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    const userId = localStorage.getItem('userId');
    this.userService.getUserDetails(userId).subscribe(
      res => { this.userData = res; },
      err => {  }
    );
  }

}
