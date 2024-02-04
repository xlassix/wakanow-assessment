import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

export class LoginComponent implements OnChanges {
  form: UserInfo = { ...emptyUserInfo }
  error = ""
  hide = true;

  constructor(private authService: AuthService, private router: Router) { }

  clearError() {
    this.error = ""
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.authService.isAuthenticated$.subscribe(e => {
      if (e) {
        this.router.navigate(["/home"])
      }
    })
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }


  onSubmit(form: NgForm): void {
    try {
      this.authService.login(this.form)
        .subscribe(e => {
          this.authService.validateUser(e, this.form.password)
          form.reset()
        }, error => { this.error = error });
    } catch (e: any) {
      this.error = e
    }
  }

}