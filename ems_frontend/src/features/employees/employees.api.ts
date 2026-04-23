import { api } from "@core/api";
import { Employee, CreateEmployeeDto } from "./employees.types";

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployee = async (
  data: CreateEmployeeDto,
): Promise<Employee> => {
  const res = await api.post("/employees", data);
  return res.data;
};

export const updateEmployee = async (data: Employee): Promise<Employee> => {
  const res = await api.put(`/employees/${data.id}`, data);
  return res.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`);
};
