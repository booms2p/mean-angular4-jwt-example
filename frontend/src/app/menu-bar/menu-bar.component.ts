import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "app/_services/authentication.service";

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }
  
  isLogIn: boolean = false;
  user = JSON.parse(localStorage.getItem('currentUser'));
  
  ngOnInit() {
    this.isLogIn = this.authenticationService.checkAuthen();
    // this.user.img = "assets/img/Sasii-KrungThai.png";
    // console.log(this.isLogIn);
    // console.log(this.user);
  }

}
