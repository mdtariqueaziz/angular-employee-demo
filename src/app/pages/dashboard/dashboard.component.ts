import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/core/models/employee.model';

interface DeptStat {
  name: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalEmployees = 0;
  activeEmployees = 0;
  inactiveEmployees = 0;
  totalDepartments = 0;
  recentEmployees: Employee[] = [];
  deptStats: DeptStat[] = [];
  loading = true;

  deptColors = [
    '#3f51b5','#26a69a','#ef5350','#ffa726','#ab47bc',
    '#42a5f5','#ec407a','#66bb6a','#ff7043','#29b6f6'
  ];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard(): void {
    this.loading = true;
    this.employeeService.getAll().subscribe({
      next: (employees) => {
        this.totalEmployees = employees.length;
        this.activeEmployees = employees.filter(e => e.status === 'ACTIVE').length;
        this.inactiveEmployees = employees.filter(e => e.status === 'INACTIVE').length;

        // Department grouping
        const deptMap = new Map<string, number>();
        employees.forEach(e => {
          const dept = e.department || 'Unassigned';
          deptMap.set(dept, (deptMap.get(dept) || 0) + 1);
        });
        this.totalDepartments = deptMap.size;
        this.deptStats = Array.from(deptMap.entries())
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        // Recent employees (last 5)
        this.recentEmployees = [...employees].reverse().slice(0, 5);
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  getDeptColor(index: number): string {
    return this.deptColors[index % this.deptColors.length];
  }

  getInitials(emp: Employee): string {
    return ((emp.firstName?.[0] || '') + (emp.lastName?.[0] || '')).toUpperCase();
  }

  getAvatarColor(name: string): string {
    const colors = ['#3f51b5','#26a69a','#ef5350','#ffa726','#ab47bc','#42a5f5'];
    const idx = (name.charCodeAt(0) || 0) % colors.length;
    return colors[idx];
  }
}
