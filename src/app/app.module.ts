import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material Modules
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ConfirmDialogComponent } from './shared/confirm-dialog/confirm-dialog.component';

// Pages
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { DepartmentsComponent } from './pages/departments/departments.component';

// Existing components (kept for compatibility)
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { DemoComponent } from './pages/demo/demo/demo.component';
import { ChildComponent } from './pages/child-parent/child/child.component';
import { ParentComponent } from './pages/child-parent/parent/parent.component';
import { PipesDemoComponent } from './pipes/pipes-demo/pipes-demo.component';
import { CustomUppercasePipe } from './pipes/pipes-demo/custom-pipe/custom-uppercase.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ConfirmDialogComponent,

    // Pages
    DashboardComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    EmployeeDetailComponent,
    DepartmentsComponent,

    // Legacy
    UserListComponent,
    UserFormComponent,
    DemoComponent,
    ChildComponent,
    ParentComponent,
    PipesDemoComponent,
    CustomUppercasePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatTooltipModule,
    MatDividerModule,
    MatChipsModule,
    MatPaginatorModule,
    MatSortModule,
    MatMenuModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
