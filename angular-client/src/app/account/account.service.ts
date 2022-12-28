import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, of, ReplaySubject } from 'rxjs';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:5011/api/';
  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  setCurrentUser(user: IUser) {
    if (user === null) {
      this.currentUserSource.next(null);
      return of(null);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${user.token}`);

    return this.http.get(this.baseUrl + 'account/currentUser', { headers }).pipe(
      map((currentUser: IUser) => {
        if (currentUser) {
          currentUser.roles = [];
          const roles = this.getDecodedTokenRoles(currentUser.token);
          Array.isArray(roles) ? currentUser.roles = roles : currentUser.roles.push(roles);
          localStorage.setItem('user', JSON.stringify(currentUser));
          this.currentUserSource.next(currentUser);
        }
      })
    );
  }

  login(values: any) {
    let result:string;
    return this.http.post(this.baseUrl + "account/login", values).pipe(
       map((user: IUser) => {
        if (user) {
          this.setCurrentUser(user).subscribe();
          return of("logged")
        }
      })
    )
  }

  register(values: any) {
    return this.http.post(this.baseUrl + 'account/register', values).subscribe({
      next: () => {
        this.login(values).subscribe({
          next: () => {
            this.router.navigateByUrl("/")
          },
          error: (error) => {
            console.log(error)
          }
        })
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('account/login');
  }



  getDecodedTokenRoles(token) {
    let claims = JSON.parse(atob(token.split('.')[1]));
    let roles = claims['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return roles;
  }


}
