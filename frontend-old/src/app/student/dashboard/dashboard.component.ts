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
    const universalId = localStorage.getItem('universalId');
    this.userService.getUserDetails(universalId).subscribe(
      res => { this.userData = res; },
      err => {  }
    );
  }

}
