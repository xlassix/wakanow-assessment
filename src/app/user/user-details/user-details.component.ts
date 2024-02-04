import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';

type formUser =
  User & { canLogin?: boolean }


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {

  @Input() set selectedUser(value: User) {
    this.currentUser = Object.assign({}, { ...value, canLogin: value.role === "admin" });
  }
  @Output() userUpdated = new EventEmitter<User>();

  title = "Update User Info";
  currentUser: formUser;

  constructor() { }

  updateUser(user: formUser) {
    const tempUser = user;
    tempUser.role = tempUser.canLogin ? "admin" : "none"
    delete tempUser.canLogin
    this.userUpdated.emit({...tempUser});
  }
}
