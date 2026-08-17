import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/core/models/employee.model';

interface Department {
  name: string;
  employees: Employee[];
  color: string;
  bgColor: string;
}

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  departments: Department[] = [];
  loading = true;
  totalEmployees = 0;
  searchTerm = '';

  private palette = [
    { color: '#3f51b5', bg: '#e8eaf6' },
    { color: '#00796b', bg: '#e0f2f1' },
    { color: '#c62828', bg: '#fce4ec' },
    { color: '#e65100', bg: '#fff3e0' },
    { color: '#6a1b9a', bg: '#f3e5f5' },
    { color: '#1565c0', bg: '#e3f2fd' },
    { color: '#558b2f', bg: '#f1f8e9' },
    { color: '#37474f', bg: '#eceff1' },
    { color: '#ad1457', bg: '#fce4ec' },
    { color: '#00838f', bg: '#e0f7fa' },
  ];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.totalEmployees = employees.length;
        const deptMap = new Map<string, Employee[]>();
        employees.forEach(emp => {
          const key = emp.department || 'Unassigned';
          if (!deptMap.has(key)) deptMap.set(key, []);
          deptMap.get(key)!.push(emp);
        });

        this.departments = Array.from(deptMap.entries())
          .map(([name, emps], idx) => ({
            name,
            employees: emps,
            color: this.palette[idx % this.palette.length].color,
            bgColor: this.palette[idx % this.palette.length].bg
          }))
          .sort((a, b) => b.employees.length - a.employees.length);

        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  get filteredDepartments(): Department[] {
    if (!this.searchTerm) return this.departments;
    const term = this.searchTerm.toLowerCase();
    return this.departments.filter(d => d.name.toLowerCase().includes(term));
  }

  viewDeptEmployees(dept: Department): void {
    // Navigate to employees list with search pre-filled
    this.router.navigate(['/employees'], { queryParams: { dept: dept.name } });
  }

  getInitials(emp: Employee): string {
    return ((emp.firstName?.[0] || '') + (emp.lastName?.[0] || '')).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#3f51b5','#26a69a','#ef5350','#ffa726','#ab47bc','#42a5f5'];
    const idx = (name?.charCodeAt(0) || 0) % colors.length;
    return colors[idx];
  }

  getActiveCount(dept: Department): number {
    return dept.employees.filter(e => e.status === 'ACTIVE').length;
  }

  getPercentage(dept: Department): number {
    return this.totalEmployees > 0
      ? Math.round((dept.employees.length / this.totalEmployees) * 100)
      : 0;
  }
}
