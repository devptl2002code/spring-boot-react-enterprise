import { Employee } from "../employees/employees.types";

export interface EmployeeStats {
  totalCount: number;
  avgSalary: number;
  byDepartment: Record<string, number>;
  byRole: Record<string, number>;
  salaryRanges: Record<string, number>;
}

export interface DashboardData {
  stats: EmployeeStats;
  recentEmployees: Employee[];
}

