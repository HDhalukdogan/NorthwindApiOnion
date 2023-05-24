import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService: AccountService){}


  canActivate(): Observable<boolean > {
    return this.accountService.currentUser$.pipe(
      map(user=> {
        if (user&&user.roles&&user.roles.includes('admin')) {
          return true;
        }
      })
    )
  }
  
}
