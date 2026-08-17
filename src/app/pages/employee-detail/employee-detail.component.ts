import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
  employee: Employee | null = null;
  loading = true;
  employeeId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployee(id).subscribe({
      next: (emp) => {
        this.employee = emp;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Employee not found', 'Close', {
          duration: 3000,
          panelClass: 'error-snack'
        });
        this.loading = false;
        this.router.navigate(['/employees']);
      }
    });
  }

  editEmployee(): void {
    this.router.navigate(['/employees/edit', this.employeeId]);
  }

  goBack(): void {
    this.router.navigate(['/employees']);
  }

  getInitials(emp: Employee): string {
    return ((emp.firstName?.[0] || '') + (emp.lastName?.[0] || '')).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#3f51b5','#26a69a','#ef5350','#ffa726','#ab47bc','#42a5f5'];
    const idx = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[idx];
  }

  formatSalary(salary?: number): string {
    if (!salary) return 'Not specified';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency', currency: 'INR', maximumFractionDigits: 0
    }).format(salary);
  }

  formatDate(dateStr?: string): string {
    if (!dateStr) return 'Not specified';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }
}
