import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { DateAdapter } from "@angular/material";

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {'username': '', 'password': ''};
  loading = false;
  returnUrl: string;
  isLogIn: boolean = false;

  constructor(
    private activeRoute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService,
    private dateAdapter: DateAdapter<Date>) {
    dateAdapter.setLocale('th');
    console.log(dateAdapter)
  }

  ngOnInit() {
    this.authenticationService.logout();

    this.returnUrl = this.activeRoute.snapshot.queryParams['returnUrl'] || '/';

    this.isLogIn = this.authenticationService.checkAuthen();
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.model.username, this.model.password).subscribe(
      data => {
        this.router.navigate([this.returnUrl]);
      },
      error => {
        this.alertService.error(error._body);
        this.loading = false;
        alert(error._body);
      }
    );
  }


}
