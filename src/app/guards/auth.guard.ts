import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (!this.authService.getToken()) {
        this.router.navigate(['login']);
        return false;
      } else {
        if (this.authService.checkForExperation()) {
          this.router.navigate(['login']);
          alert('Your session has been expired. New authorization required');
          this.authService.logout();
          return false;
        }
        return true;
}

    }
}
