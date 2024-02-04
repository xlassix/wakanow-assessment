import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../../interfaces/user.interface';
import { NotificationService } from '../notifications/notification.service';
import { catchError, tap, throwError } from 'rxjs';

const BASE_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  model = 'users';

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  getPendingUsers(displayNotification: boolean) {
    if (displayNotification) {
      this.notificationService.notify('Get All Users HTTP Call');
    }
    return this.http.get<User[]>(this.getUrlByStatus("role", "none"));
  }

  getUsersUnderManagement(userId?: string) {
    return this.http.get<User[]>(this.getUrlByStatus("accountAdmin", userId??"unknown"));
  }


  createUser(user: User) {
    this.notificationService.notify('Create User HTTP Call');
    return this.http.post<User>(this.getUrl(), { ...user, id: user.id.toLowerCase() });
  }

  updateUser(user: User) {
    this.notificationService.notify('Update User HTTP Call');
    return this.http.put<User>(this.getUrlWithID(user.id), { ...user, id: user.id.toLowerCase() });
  }

  deleteUser(id: string) {
    this.notificationService.notify('Delete User HTTP Call');
    return this.http.delete(this.getUrlWithID(id));
  }

  getUser(id: string) {
    return this.http.get(this.getUrlWithID(id))
  }

  private getUrl() {
    return `${BASE_URL}/${this.model}`;
  }

  private getUrlWithID(id: string) {
    return `${this.getUrl()}/${id.toLowerCase()}`;
  }
  private getUrlByStatus(status: keyof User, value: string) {
    return `${this.getUrl()}?${status}=${value.toLowerCase()}`;
  }
}
