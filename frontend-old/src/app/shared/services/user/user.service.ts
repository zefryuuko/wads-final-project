import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public getUserDetails(userId: string) {
    const url = `${environment.apiEndpoint}/users/user/${userId}`;
    return this.httpClient.get(url);
  }
}
