import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel } from "@tanstack/react-table";
import { useState, useMemo } from "react";

import { useEmployees, useCreateEmployee, useUpdateEmployee, useDeleteEmployee } from "./employees.hooks";
import { Employee } from "./employees.types";
import { useSnackbar } from "@app/providers/SnackbarProvider";
import { getEmployeeTableColumns } from "./employeeTableColumns";
import { EmployeeHeader } from "./components/EmployeeHeader";
import { EmployeeSearch } from "./components/EmployeeSearch";
import { EmployeeTable } from "./components/EmployeeTable";
import { EmployeePagination } from "./components/EmployeePagination";
import { EmployeeFormDialog } from "./components/EmployeeFormDialog";
import { DeleteConfirmationDialog } from "./components/DeleteConfirmationDialog";

export const EmployeesPage = () => {
  const muiTheme = useTheme();
  const isLight = muiTheme.palette.mode === "light";
  const { showSnackbar } = useSnackbar();

  const { data = [], isLoading } = useEmployees();
  const createMutation = useCreateEmployee();
  const updateMutation = useUpdateEmployee();
  const deleteMutation = useDeleteEmployee();

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 8 });
  const [openForm, setOpenForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
    salary: "",
  });

  // Table columns with handlers
  const columns = useMemo(
    () =>
      getEmployeeTableColumns(isLight, {
        onEdit: (employee: Employee) => handleOpenEdit(employee),
        onDelete: (id: number) => setDeleteId(id),
      }),
    [isLight]
  );

  // Table instance
  const table = useReactTable({
    data,
    columns,
    state: { globalFilter, pagination },
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  // Handlers
  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setForm({ firstName: "", lastName: "", email: "", department: "", salary: "" });
    setOpenForm(true);
  };

  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setForm({
      firstName: emp.firstName ?? "",
      lastName: emp.lastName ?? "",
      email: emp.email,
      department: emp.department ?? "",
      salary: emp.salary ? String(emp.salary) : "",
    });
    setOpenForm(true);
  };

  const handleFormSubmit = () => {
    const payload = { ...form, salary: form.salary ? Number(form.salary) : null };
    if (editingEmployee) {
      updateMutation.mutate(
        { id: editingEmployee.id, ...payload },
        {
          onSuccess: () => {
            showSnackbar("Employee updated successfully");
            setOpenForm(false);
          },
          onError: () => showSnackbar("Update failed", "error"),
        }
      );
    } else {
      createMutation.mutate(payload, {
        onSuccess: () => {
          showSnackbar("Employee created successfully");
          setOpenForm(false);
        },
        onError: () => showSnackbar("Creation failed", "error"),
      });
    }
  };

  const handleConfirmDelete = () => {
    if (!deleteId) return;
    deleteMutation.mutate(deleteId, {
      onSuccess: () => {
        showSnackbar("Employee deleted", "success");
        setDeleteId(null);
      },
      onError: () => {
        showSnackbar("Failed to delete", "error");
        setDeleteId(null);
      },
    });
  };

  return (
    <Box sx={{ transition: "background-color 0.3s ease" }}>
      <EmployeeHeader employeeCount={data.length} onAddEmployee={handleOpenAdd} />
      <EmployeeSearch
        globalFilter={globalFilter}
        onGlobalFilterChange={setGlobalFilter}
        isLoading={isLoading}
      />
      <EmployeeTable table={table} columns={columns} isLoading={isLoading} />
      <EmployeePagination table={table} />
      <EmployeeFormDialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        editingEmployee={editingEmployee}
        form={form}
        onFormChange={setForm}
        onSubmit={handleFormSubmit}
      />
      <DeleteConfirmationDialog
        open={deleteId !== null}
        onClose={() => setDeleteId(null)}
        onConfirmDelete={handleConfirmDelete}
      />
    </Box>
  );
};