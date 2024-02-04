import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../shared/interfaces/user.interface';
import { UserService } from '../shared/services/user/user.service';
import { NgForm } from '@angular/forms';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { catchError, mergeMap, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

const emptyUserInfo: User = {
  id: "",
  role: "none",
  firstName: "",
  lastName: "",
  pass_code: "",
  accountAdmin: ""
}
export interface DialogData {
  pass_code: string;
  username: string;
  toLogin: () => void;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  protected doesUserExist = true;
  form: User = emptyUserInfo
  error = ""
  token = ""

  constructor(private userService: UserService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.generatePassCode()
  }

  generatePassCode() {
    this.form.pass_code = Math.random().toString(36).substring(2, 15);
  }

  clearError() {
    this.error = ""
    this.doesUserExist = true;
    this.token = ""
    this.generatePassCode()
  }


  openDialog(user: User): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      data: { pass_code: user.pass_code, username: user.id, toLogin: ()=>this.navigateToLogin() },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.clearError();
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(form: NgForm): void {
    try {
      this.userService.getUser(this.form.id).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error?.status == 404) {
            this.doesUserExist = false
            return this.userService.createUser(this.form)
          } else {
            console.error('Error:', error?.status);
            return throwError(error);
          }
        }),
        mergeMap(value => this.doesUserExist ? throwError(() => new Error("Username already Exists")) : of(value),
        ))
        .subscribe((e) => { this.openDialog(e as User); form.resetForm() }, error => { this.error = error });
    } catch (e: any) {
      this.error = e
    }
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.template.html',
  styleUrl: './signup.component.css',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
