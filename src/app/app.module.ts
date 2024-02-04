import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material.model';
import { AuthService } from './shared/services/auth/auth.service';
import { NotificationService } from './shared/services/notifications/notification.service';
import { HomeComponent } from './home/home.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserComponent } from './user/user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailsComponent } from './user/user-details/user-details.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    UserListComponent,
    UserDetailsComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthService, provideAnimationsAsync(),],
  bootstrap: [AppComponent, NotificationService]
})
export class AppModule { }
