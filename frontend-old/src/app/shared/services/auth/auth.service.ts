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

  public storeSessionId(sessionId: string, universalId: string) {
    localStorage.setItem('sessionId', sessionId);
    localStorage.setItem('universalId', universalId);
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
    localStorage.removeItem('universalId');
  }

  public login(email: string, pwd: string, successCallback: (res: any) => void, failedCallback: (err: any) => void) {
    const url = `${environment.apiEndpoint}/auth/session`;

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

  // TODO: FIX DIS
  public isSessionValid(sessionId: string, universalId: string) {
    const url = `${environment.apiEndpoint}/auth/session`;
    return this.httpClient.request(
      'get',
      url,
      { body: { sessionId, universalId } }
    );
  }
}
