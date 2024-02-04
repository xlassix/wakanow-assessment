import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth/auth.service';
import { shareReplay } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  loggedInInUser: { userId?: string }
  title = 'Assessment';
  links = [
    { path: '/home', icon: 'home', title: 'Home' },
  ];
  isAuthenticated$ = this.authService.isAuthenticated$.pipe(shareReplay(1));

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.getLoggedInUser();
  }

  getLoggedInUser() {
    this.loggedInInUser = this.authService.getIsAuthenticated()
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
