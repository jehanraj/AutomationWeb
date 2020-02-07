import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  userKey = 'auth_user';

  constructor(private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userData = sessionStorage.getItem(this.userKey);

    if (userData) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }

}
