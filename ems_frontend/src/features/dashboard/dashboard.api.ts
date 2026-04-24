import { api } from "@core/api";
import { EmployeeStats } from "./dashboard.types";

export const getEmployeeStats = async (): Promise<EmployeeStats> => {
  const res = await api.get("/employees/stats");
  return res.data;
};