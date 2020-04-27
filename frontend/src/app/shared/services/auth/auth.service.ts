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

  public storeSessionId(sessionId: string) {
    localStorage.setItem('sessionId', sessionId);
  }

  public clearSessionId() {
    const sessionId = localStorage.getItem('sessionId');
    const url = `${environment.apiEndpoint}/auth/session`;

    // Revoke session id on the server
    this.httpClient.request(
      'delete',
      url,
      {
        body: {
          sessionId
        }
      }
    ).subscribe(
      res => console.log(res),
      err => console.log(err)
    );

    // Remove localStorage data
    localStorage.removeItem('sessionId');
  }

  public login(email: string, pwd: string, successCallback: (res: any) => void, failedCallback: (err: any) => void) {
    const url = `${environment.apiEndpoint}/auth/session`;
    console.log(url, email, pwd);
    this.httpClient.post(
      url,
      {
        emailAddress: email,
        password: pwd
      },
      { observe: 'body' }
    ).subscribe(
      res => successCallback(res),
      err => failedCallback(err)
    );
  }

  public logout(callback: () => void) {
    this.clearSessionId();
    callback();
  }
}
