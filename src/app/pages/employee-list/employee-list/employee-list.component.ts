import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/core/models/employee.model';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  queryData = '';
  order = 'asc';
  page = 1;
  limit = 10;
  totalElements = 0;
  totalPages = 0;
  loading = false;

  pageSizeOptions = [5, 10, 20, 50];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getEmployeePage();
  }

  getEmployeePage(): void {
    this.loading = true;
    this.employeeService.getEmployeePage(this.queryData, this.order, this.page, this.limit)
      .subscribe({
        next: (response) => {
          this.employees = response.content;
          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Failed to load employees', 'Close', {
            duration: 3000,
            panelClass: 'error-snack'
          });
          this.loading = false;
        }
      });
  }

  addEmployee(): void {
    this.router.navigate(['/employees/add']);
  }

  editEmployee(emp: Employee): void {
    this.router.navigate(['/employees/edit', emp.id]);
  }

  viewEmployee(emp: Employee): void {
    this.router.navigate(['/employees', emp.id]);
  }

  deleteEmployee(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: { message: 'Are you sure you want to delete this employee? This action cannot be undone.' }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            this.snackBar.open('Employee deleted successfully', 'Close', {
              duration: 3000,
              panelClass: 'success-snack'
            });
            this.getEmployeePage();
          },
          error: (err) => {
            console.error(err);
            this.snackBar.open('Failed to delete employee', 'Close', {
              duration: 3000,
              panelClass: 'error-snack'
            });
          }
        });
      }
    });
  }

  onPageChange(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.getEmployeePage();
    }
  }

  onSearch(): void {
    this.page = 1;
    this.getEmployeePage();
  }

  getInitials(emp: Employee): string {
    return ((emp.firstName?.[0] || '') + (emp.lastName?.[0] || '')).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#3f51b5','#26a69a','#ef5350','#ffa726','#ab47bc','#42a5f5'];
    const idx = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[idx];
  }

  getPages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.page - 2);
    const end = Math.min(this.totalPages, this.page + 2);
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  }
}