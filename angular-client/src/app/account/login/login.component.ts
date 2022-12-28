import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loginError: string;
  model: any = {};

  constructor(private accountService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.createLoginForm()
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      name: new FormControl('bob', Validators.required),
      password: new FormControl('Pa$$w0rd', Validators.required),
    })
  }

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next: (res) => {
        res.subscribe({
          next: (log) => {
            if (log === "logged") {
                this.router.navigateByUrl(this.returnUrl)
            }
          }
        })
      },
      error: (error) => {
        this.loginError = error.message
        console.log('this.loginError', this.loginError)
      }
    })
  }

  formsModule() {
    console.log(this.model)
  }

}
