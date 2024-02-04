import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../shared/interfaces/user.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @Input({
    required: true
  }) users: User[] | null;
  @Output() userSelected = new EventEmitter<User>();
  constructor() { }
  selectUser(user: User) {
    this.userSelected.emit(user);
  }
}
