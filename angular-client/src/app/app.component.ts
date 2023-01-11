import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { IUser } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-client';


  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  setCurrentUser() {
    const user:IUser = JSON.parse(localStorage.getItem('user'));
      this.accountService.setCurrentUser(user).subscribe({
        next: ()=> {console.log('user loaded')},
        error: (e) => {
          console.log(e)
          if (user) {
            this.accountService.logout();
          }
        }
      });
  }

}
