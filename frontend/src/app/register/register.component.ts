import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../_services/alert.service';
import { UserService } from '../_services/user.service';

@Component({
  moduleId: module.id,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  loading: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }
  
  register() {
    this.loading = true;
    this.model.role = 'Admin'
    this.userService.create(this.model)
      .subscribe(
        data => {
          this.alertService.success('สมัครสมาชิก เสร็จสมบูรณ์', true);
          this.router.navigate(['/login']);
        },
        error => {
          this.alertService.error(error._body);
          this.loading = false;
        }
      );
  }

  ngOnInit() {
  }

}
