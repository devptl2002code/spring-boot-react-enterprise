import { Box, Typography, Button, TextField } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface EmployeePaginationProps {
  table: any;
}

export const EmployeePagination = ({ table }: EmployeePaginationProps) => {
  const muiTheme = useTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      gap={2}
    >
      <Typography variant="body2" color="text.secondary">
        Showing{" "}
        <Box component="span" fontWeight={700} color="text.primary">
          {table.getRowModel().rows.length}
        </Box>{" "}
        of{" "}
        <Box component="span" fontWeight={700} color="text.primary">
          {table.getFilteredRowModel().rows.length}
        </Box>{" "}
        results
      </Typography>

      <Box display="flex" alignItems="center" gap={1}>
        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          sx={{ minWidth: 80 }}
        >
          ← Prev
        </Button>

        <Box
          sx={{
            px: 2,
            py: 0.75,
            borderRadius: "8px",
            border: `1px solid ${muiTheme.palette.divider}`,
            backgroundColor: "background.paper",
          }}
        >
          <Typography variant="body2" fontWeight={700} color="text.primary" lineHeight={1}>
            {table.getState().pagination.pageIndex + 1} / {table.getPageCount() || 1}
          </Typography>
        </Box>

        <Button
          variant="outlined"
          color="primary"
          size="small"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          sx={{ minWidth: 80 }}
        >
          Next →
        </Button>

        <TextField
          select
          size="small"
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          SelectProps={{ native: true }}
          sx={{ width: 110 }}
        >
          {[5, 8, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n} / page
            </option>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};