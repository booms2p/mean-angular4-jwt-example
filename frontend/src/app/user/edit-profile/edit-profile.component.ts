import { Component, OnInit } from '@angular/core';
import { AlertService } from "app/_services/alert.service";
import { AuthenticationService } from "app/_services/authentication.service";
import { UserService } from "app/_services/user.service";
import { Router } from "@angular/router";
import { MdDialog, DateAdapter } from "@angular/material";
import { AppDialogComponent } from "app/app-dialog/app-dialog.component"

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private alertService: AlertService, 
    private router: Router, 
    public dialog: MdDialog,
    private dateAdapter: DateAdapter<Date>) {
      this.dateAdapter.setLocale('th');
     }

  user;
  userPic: any;
  userPicBase64: any;
  newProfilePic: any;
  loading: boolean = false;

  changeProfilePic(event, fileID) {
    this.userPicBase64 = "";
    if (event.target.files[0]) {

      if (event.target.files[0].type.indexOf('image') === -1) {
        alert('กรุณาเลือกไฟล์รูปภาพ');
        return;
      } else if (event.target.files[0].size > 2000000) {
        alert('กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 2MB');
        return;
      }
      let reader = new FileReader();

      reader.onloadend = (e) => {
        this.userPicBase64 = reader.result;
        // console.log(this.userPicBase64);
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submitEditProfile() {

    if (this.userPicBase64) {
      this.user.profilePic = this.userPicBase64;
    }

    let dialogRef = this.dialog.open(AppDialogComponent, {
      disableClose: true,
      width: '80%',
      position: {
        top: "30px"
      }
    });

    this.authenticationService.upDateProfile(this.user).subscribe(
      data => {
        // this.router.navigate(['/']);
        console.log(data)

        dialogRef.componentInstance.data = data;
      },
      error => {
        this.alertService.error(error._body);
        // this.loading = false;
        alert(error._body);
      }
    );
  }


  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.userPic = this.user.profilePic;
  }

}
