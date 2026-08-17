import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  currentYear = new Date().getFullYear();

  constructor(public router: Router) {}

  getPageTitle(): string {
    const url = this.router.url;
    if (url.includes('/dashboard')) return 'Dashboard';
    if (url.includes('/employees/add')) return 'Add Employee';
    if (url.includes('/employees/edit')) return 'Edit Employee';
    if (url.includes('/employees/')) return 'Employee Detail';
    if (url.includes('/employees')) return 'Employees';
    if (url.includes('/departments')) return 'Departments';
    return '';
  }
}

