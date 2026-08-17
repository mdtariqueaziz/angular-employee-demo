import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{

  constructor(private userService: UserService,  public dialog: MatDialog) { }
  ngOnInit(): void {
   this.getUsers();
  }

  user: [] = [];

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.user = data;
    })
  }

  openDialog(user?: any): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '400px',
      data: user || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.getUsers();
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.getUsers();
      });
    }
  }

}
