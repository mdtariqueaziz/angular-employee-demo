export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  salary?: number;
  hireDate?: string;
  status?: 'ACTIVE' | 'INACTIVE';
}

export interface EmployeePage {
  content: Employee[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}
