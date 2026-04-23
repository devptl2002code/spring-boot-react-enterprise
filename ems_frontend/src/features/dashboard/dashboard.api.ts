import { api } from "@core/api";
import { EmployeeStats } from "./dashboard.types";
import { Employee } from "../employees/employees.types";

export const getEmployeeStats = async (): Promise<EmployeeStats> => {
  const res = await api.get("/employees/stats");
  return res.data;
};

export const getRecentEmployees = async (): Promise<Employee[]> => {
  const res = await api.get("/employees?_limit=5&_sort=id&_order=desc");
  return res.data;
};

