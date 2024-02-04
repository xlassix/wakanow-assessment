import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { User } from '../shared/interfaces/user.interface';
import { UserService } from '../shared/services/user/user.service';
import { AuthService } from '../shared/services/auth/auth.service';

const emptyUser: User = {
  id: '',
  firstName: '',
  lastName: '',
  role: 'none',
};


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent implements OnInit {
  @Input({ required: true }) loggedInInUser: { userId?: string } | null;
  users$: Observable<User[]>;
  usersUnderManagement$: Observable<User[]>;


  selectedUser: User;

  constructor(private userService: UserService, private authService: AuthService) {
    this.selectedUser = { ...emptyUser }
  }

  ngOnInit(): void {
    this.loadUsers(true);
    this.resetUser();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  loadUsers(displayNotification: boolean) {
    this.usersUnderManagement$ = this.userService.getUsersUnderManagement(this.loggedInInUser?.userId).pipe(
      tap(users => {
        this.users$ = this.loggedInInUser?.userId == "admin" && users.length >= 1 ? of([]) : this.userService.getPendingUsers(displayNotification);
      })
    )
  }

  saveUser(user: User) {
    if (user.id) {
      this.updateUser(user);
    } else {
      this.createUser(user);
    }
    this.resetUser();
  }

  updateUser(user: User) {
    this.userService.updateUser({ ...user, accountAdmin: this.loggedInInUser?.userId }).pipe(
      tap(() => {
        this.loadUsers(false);
        this.selectUser(user)
      })
    ).subscribe();
  }

  createUser(user: User) {
    this.userService.createUser(user).pipe(
      tap(() => this.loadUsers(false))
    ).subscribe();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).pipe(
      tap(() => this.loadUsers(false))
    ).subscribe();
  }

  resetUser() {
    this.selectUser({ ...emptyUser });
  }
}
