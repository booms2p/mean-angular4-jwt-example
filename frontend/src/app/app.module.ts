import { DateAdapter } from '@angular/material';
import { CustomAdapterDateformat } from './custom-adapter-dateformat';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routing } from './app.routing';
import { AppConfig } from './app.config';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './_guards/auth.guard';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

import { AccordionModule, DataTableModule, SharedModule, MenuItem, InputTextModule, DropdownModule, MultiSelectModule, ButtonModule, DialogModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdDatepickerModule, MdNativeDateModule, MdButtonModule, MdCheckboxModule, MdCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';
import { AppDialogComponent } from "app/app-dialog/app-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    MenuBarComponent,
    EditProfileComponent,
    AppDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    AccordionModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule, 
    MdCheckboxModule,
    MdCardModule,
    DataTableModule,
    SharedModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    ButtonModule,
    DialogModule
  ],
  exports: [
    MdButtonModule,
    MdCheckboxModule,
    MaterialModule,
    MdDatepickerModule,
    MdNativeDateModule, 
    MdCheckboxModule,
    MdCardModule
  ],
  entryComponents: [
    AppDialogComponent
  ],
  providers: [
    AppConfig,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    { provide: DateAdapter, useClass: CustomAdapterDateformat }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
