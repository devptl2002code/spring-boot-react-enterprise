export interface Employee {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  department: string | null;
  salary: number | null;
}

export type CreateEmployeeDto = Omit<Employee, "id">;
