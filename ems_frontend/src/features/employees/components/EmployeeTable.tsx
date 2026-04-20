import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { flexRender } from "@tanstack/react-table";
import { People } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

interface EmployeeTableProps {
  table: any;
  columns: any[];
  isLoading: boolean;
}

export const EmployeeTable = ({ table, columns, isLoading }: EmployeeTableProps) => {
  const muiTheme = useTheme();
  const isLight = muiTheme.palette.mode === "light";

  return (
    <TableContainer
      component={Paper}
      sx={{
        border: `1px solid ${muiTheme.palette.divider}`,
        borderRadius: "12px",
        overflow: "hidden",
        mb: 2,
        boxShadow: isLight
          ? "0 4px 20px rgba(0,0,0,0.06)"
          : "0 4px 30px rgba(0,0,0,0.35)",
        transition: "box-shadow 0.3s",
      }}
    >
      <Table sx={{ minWidth: 680 }}>
        <TableHead>
          {table.getHeaderGroups().map((hg: any) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h: any) => (
                <TableCell
                  key={h.id}
                  style={{ cursor: h.column.getCanSort() ? "pointer" : undefined }}
                  onClick={h.column.getToggleSortingHandler()}
                >
                  <Box display="flex" alignItems="center" gap={0.5}>
                    {flexRender(h.column.columnDef.header, h.getContext())}
                    {({ asc: " ↑", desc: " ↓" } as any)[h.column.getIsSorted() as string] ?? null}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>

        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                <CircularProgress sx={{ color: "#ed964a" }} />
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} align="center" sx={{ py: 8 }}>
                <People sx={{ fontSize: 40, color: "text.secondary", opacity: 0.3, mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  No employees found
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            table.getRowModel().rows.map((row: any) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id} sx={{ py: 1.5 }}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};