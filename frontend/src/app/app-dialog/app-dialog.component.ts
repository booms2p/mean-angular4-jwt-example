import { Component, OnInit } from '@angular/core';
import { MdDialog, MdDialogRef } from "@angular/material";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dialog',
  templateUrl: './app-dialog.component.html',
  styleUrls: ['./app-dialog.component.css']
})
export class AppDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AppDialogComponent>, private router: Router) { }
  
  data:any;
  ngOnInit() {
  }

  navigate() {
    this.router.navigate(['/']);
  }

}
