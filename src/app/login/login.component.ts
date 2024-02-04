import { Component, OnInit } from '@angular/core';
import { UserInfo } from '../shared/interfaces/auth.interface';
import { AuthService } from '../shared/services/auth/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const emptyUserInfo = {
  username: '',
  password: '',
};
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent {
  form: UserInfo = emptyUserInfo
  error = ""
  hide = true;

  constructor(private authService: AuthService, private router: Router) { }

  clearError() {
    this.error = ""
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }


  onSubmit(form: NgForm): void {
    try {
      this.authService.login(this.form)
        .subscribe(e => this.authService.validateUser(e, this.form.password), error => { this.error = error });
    } catch (e: any) {
      this.error = e
    }
  }

}