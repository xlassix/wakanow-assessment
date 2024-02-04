import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, mergeMap, of, tap, throwError } from 'rxjs';

import { UserInfo } from '../../interfaces/auth.interface';
import { UserService } from '../user/user.service';
import { User } from '../../interfaces/user.interface';
import { HttpErrorResponse } from '@angular/common/http';

const AUTHENTICATION_KEY = 'workshop:authenticated';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isAuthenticated = new BehaviorSubject(Boolean(this.getIsAuthenticated()?.userId) || false);
  isAuthenticated$ = this.isAuthenticated.asObservable();

  constructor(private router: Router, private userService: UserService) { }

  login(userInfo: UserInfo) {
    return this.userService.getUser(userInfo.username).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error?.status == 404) {
          return throwError(() => new Error("User Not Found"))
        } else {
          console.error('Error:', error?.status);
          return throwError(error);
        }
      }),
      mergeMap(value => this.validateUser(value, userInfo.password)),

    );
  }

  validateUser(user: any, pass_code: string) {
    const data = { ...user } as User
    if (data.pass_code === pass_code) {
      if (data.role === "admin") {
        this.setIsAuthenticated({ userId: data.id });
        this.router.navigateByUrl('/home');
        return of({ user: data.id });
      }else{
        return throwError(() => new Error("Access pending approval"))
      }
    }
    else {
      return throwError(() => new Error("Invalid credentials"))
    }
  }

  logout() {
    this.removeIsAuthenticated();
    this.router.navigateByUrl('/login');
  }

  getIsAuthenticated(): { userId?: string } {
    return JSON.parse(localStorage.getItem(AUTHENTICATION_KEY) ?? "{}");
  }

  private setIsAuthenticated(user: { userId: string }) {
    localStorage.setItem(AUTHENTICATION_KEY, JSON.stringify(user));
  }
  private removeIsAuthenticated() {
    localStorage.removeItem(AUTHENTICATION_KEY);
  }
}
