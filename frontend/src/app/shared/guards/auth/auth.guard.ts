import { AuthService } from './../../services/auth/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  data: any;
  err: any;

  checkAuth(): Observable<any> {
    const sessionId = localStorage.getItem('sessionId');
    const universalId = localStorage.getItem('universalId');
    return this.authService.isSessionValid(sessionId, universalId).pipe(tap(data => this.data, error => this.err));
  }

  // TODO: FIX DIS ALSO
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.checkAuth().pipe(map(res => {
  //     if (!res) {
  //       console.log(res);
  //       this.router.navigate(['/login']);
  //     }
  //     console.log(res);
  //     return !!res;
  //   }));
  // }

  canActivate(): boolean {
    return true;
  }
}
