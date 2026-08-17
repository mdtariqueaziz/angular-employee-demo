import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {


  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public user: any,
    private userService: UserService
  ) {}

  saveUser(): void {
    if (this.user.id) {
      this.userService.updateUser(this.user, this.user.id).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }

}
