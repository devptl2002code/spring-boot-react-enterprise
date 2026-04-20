import { createBrowserRouter } from "react-router-dom";
import { LoginPage } from "@features/auth/pages/LoginPage";
import { ProtectedRoute } from "@core/routes/ProtectedRoute";
import { RoleGuard } from "@core/routes/RoleGuard";
import { AppLayout } from "@shared/components/layout/AppLayout";
import { UnauthorizedPage } from "@shared/components/UnauthorizedPage";
import { NotFoundPage } from "@shared/components/NotFoundPage";
import { EmployeesPage } from "@features/employees/EmployeesPage";

import DashboardPage from "@features/dashboard/DashboardPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorized",
    element: <UnauthorizedPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardPage />,

      },
      {
        path: "employees",
        element: (
          <RoleGuard allowedRoles={["ADMIN", "HR"]}>
            <EmployeesPage />
          </RoleGuard>
        ),
      },
      {
        path: "*",
        element: <NotFoundPage />, // nested 404
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />, // global 404
  },
]);
