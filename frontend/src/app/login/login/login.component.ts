import { AuthService } from './../../shared/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    public router: Router
  ) {
    this.authService = authService;
  }

  ngOnInit(): void {
  }

  public login(emailAddress: string, password: string) {
    this.authService.login(
      emailAddress, password,
      (res) => {
        this.authService.storeSessionId(res.sessionId);
        this.router.navigate(['student']);
      },
      (err) => {
        // TODO: create message dialog
        console.log(err);
        window.alert("Invalid email or password");
      }
    );
  }

  public logout() {
    this.authService.logout(
      () => {
        this.router.navigate(['']);
      }
    );
  }
}
