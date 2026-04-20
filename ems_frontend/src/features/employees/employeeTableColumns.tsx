import { Box, Typography, Avatar, Chip, Tooltip, IconButton } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Edit, Delete } from "@mui/icons-material";
import { Employee } from "../employees.types";

const DEPT_COLORS: Record<string, string> = {
  Engineering: "#3b82f6",
  Design: "#a855f7",
  Marketing: "#22c55e",
  Finance: "#f59e0b",
  HR: "#ef4444",
  Sales: "#f97316",
};

const getDeptColor = (dept: string) => DEPT_COLORS[dept] ?? "#64748b";
const getInitials = (first = "", last = "") =>
  `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();

interface ColumnHandlers {
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

export const getEmployeeTableColumns = (isLight: boolean, handlers: ColumnHandlers) => [
  {
    id: "employee",
    header: "Employee",
    size: 220,
    cell: ({ row }: any) => (
      <Box display="flex" alignItems="center" gap={1.5}>
        <Avatar
          sx={{
            width: 36,
            height: 36,
            fontSize: 13,
            fontWeight: 700,
            background: `linear-gradient(135deg, ${getDeptColor(row.original.department)}, ${alpha(
              getDeptColor(row.original.department),
              0.6
            )})`,
            color: "#fff",
          }}
        >
          {getInitials(row.original.firstName, row.original.lastName)}
        </Avatar>
        <Box>
          <Typography variant="body2" fontWeight={600} color="text.primary" lineHeight={1.3}>
            {row.original.firstName} {row.original.lastName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            #{String(row.original.id).padStart(4, "0")}
          </Typography>
        </Box>
      </Box>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 240,
    cell: (info: any) => (
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ fontFamily: "monospace", fontSize: 12 }}
      >
        {info.getValue()}
      </Typography>
    ),
  },
  {
    accessorKey: "department",
    header: "Department",
    size: 150,
    cell: (info: any) => {
      const dept = info.getValue() as string;
      return dept ? (
        <Chip
          label={dept}
          size="small"
          sx={{
            backgroundColor: alpha(getDeptColor(dept), isLight ? 0.12 : 0.18),
            color: getDeptColor(dept),
            border: `1px solid ${alpha(getDeptColor(dept), 0.3)}`,
            height: 24,
          }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary">
          —
        </Typography>
      );
    },
  },
  {
    accessorKey: "salary",
    header: "Salary",
    size: 140,
    cell: (info: any) => {
      const val = info.getValue() as number;
      return val ? (
        <Typography variant="body2" fontWeight={700} sx={{ color: "#ed964a" }}>
          ₹ {Number(val).toLocaleString("en-IN")}
        </Typography>
      ) : (
        <Typography variant="body2" color="text.secondary">
          —
        </Typography>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    size: 90,
    cell: ({ row }: any) => (
      <Box display="flex" gap={0.5}>
        <Tooltip title="Edit">
          <IconButton
            size="small"
            onClick={() => handlers.onEdit(row.original)}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "#285075", backgroundColor: alpha("#285075", 0.08) },
            }}
          >
            <Edit sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton
            size="small"
            onClick={() => handlers.onDelete(row.original.id)}
            sx={{
              color: "text.secondary",
              "&:hover": { color: "#ef4444", backgroundColor: alpha("#ef4444", 0.08) },
            }}
          >
            <Delete sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </Box>
    ),
  },
];