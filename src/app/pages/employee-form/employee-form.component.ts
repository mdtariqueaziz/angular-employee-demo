import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/core/models/employee.model';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  loading = false;
  saving = false;

  departments = [
    'Engineering', 'Human Resources', 'Finance', 'Marketing',
    'Sales', 'Operations', 'Legal', 'Design', 'Product', 'Support'
  ];

  positions = [
    'Software Engineer', 'Senior Engineer', 'Team Lead', 'Manager',
    'Director', 'Analyst', 'Designer', 'HR Specialist', 'Accountant',
    'Sales Executive', 'Marketing Specialist', 'DevOps Engineer'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.buildForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = +id;
      this.loadEmployee(this.employeeId);
    }
  }

  buildForm(): void {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[\+]?[0-9\s\-\(\)]{7,15}$/)]],
      department: ['', Validators.required],
      position: ['', Validators.required],
      salary: ['', [Validators.min(0), Validators.max(10000000)]],
      hireDate: [''],
      status: ['ACTIVE', Validators.required]
    });
  }

  loadEmployee(id: number): void {
    this.loading = true;
    this.employeeService.getEmployee(id).subscribe({
      next: (emp) => {
        this.form.patchValue(emp);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to load employee data', 'Close', {
          duration: 3000,
          panelClass: 'error-snack'
        });
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving = true;
    const payload: Employee = this.form.value;

    const request$ = this.isEditMode
      ? this.employeeService.updateEmployee(this.employeeId!, payload)
      : this.employeeService.createEmployee(payload);

    request$.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Employee updated successfully!' : 'Employee created successfully!',
          'Close',
          { duration: 3000, panelClass: 'success-snack' }
        );
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Failed to save employee. Please try again.', 'Close', {
          duration: 3000,
          panelClass: 'error-snack'
        });
        this.saving = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/employees']);
  }

  /** Helper for template validation */
  hasError(field: string, error: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.touched && ctrl.hasError(error));
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl && ctrl.invalid && ctrl.touched);
  }
}
