import { api } from "@core/api";
import { Employee, CreateEmployeeDto } from "./employees.types";

export const getEmployees = async (): Promise<Employee[]> => {
  const res = await api.get("/employees");
  return res.data;
};

export const createEmployee = async (
  data: CreateEmployeeDto,
  document?: File | null,
): Promise<Employee> => {
  const formData = new FormData();
  formData.append("firstName", data.firstName ?? "");
  formData.append("lastName", data.lastName ?? "");
  formData.append("email", data.email);
  formData.append("department", data.department ?? "");
  formData.append("salary", String(data.salary ?? 0));
  if (document) {
    formData.append("document", document);
  }
  const res = await api.post("/employees", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateEmployee = async (
  data: Employee,
  document?: File | null,
): Promise<Employee> => {
  const formData = new FormData();
  formData.append("firstName", data.firstName ?? "");
  formData.append("lastName", data.lastName ?? "");
  formData.append("email", data.email);
  formData.append("department", data.department ?? "");
  formData.append("salary", String(data.salary ?? 0));
  if (document) {
    formData.append("document", document);
  }
  const res = await api.put(`/employees/${data.id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`);
};

export const downloadEmployeeDocument = async (id: number, fileName: string): Promise<void> => {
  const res = await api.get(`/employees/${id}/document`, {
    responseType: "blob",
  });
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

