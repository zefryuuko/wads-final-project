import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient) { }

  public login(email: string, pwd: string) {
    const loginURL = `${environment.apiEndpoint}/auth/account`;
    console.log(loginURL, email, pwd);
    return this.httpClient.post(
      loginURL,
      {
        emailAddress: email,
        password: pwd
      },
      { observe: 'body' }
    ).pipe();
  }
}
