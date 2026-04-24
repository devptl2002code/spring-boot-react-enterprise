export interface Employee {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  department: string | null;
  salary: number | null;
  documentUrl?: string | null;
  documentName?: string | null;
}

export type CreateEmployeeDto = Omit<Employee, "id">;

