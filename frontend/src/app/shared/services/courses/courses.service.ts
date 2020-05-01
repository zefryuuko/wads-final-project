import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private httpClient: HttpClient) { }

  public getCourseGroups(page: number, successCallback: (res: any) => void, failedCallback: (err: any) => void) {
    const url = `${environment.apiEndpoint}/courses/groups?page=${page}`;
    this.httpClient.get(
      url
    ).subscribe(
      res => successCallback(res),
      err => failedCallback(err)
    );
  }
}
