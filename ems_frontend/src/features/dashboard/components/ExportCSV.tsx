import Papa from 'papaparse';
import { Button } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { FC } from 'react';

interface ExportCSVProps {
  stats: any;
  filename?: string;
}

export const ExportCSVButton: FC<ExportCSVProps> = ({ stats, filename = 'dashboard-data' }) => {
  const handleExport = () => {
    const exportData = [
      ['Metric', 'Value'],
      ['Total Employees', stats?.totalCount || 0],
      ['Average Salary', `₹${stats?.avgSalary?.toLocaleString() || 0}`],
      ['--- Departments ---', ''],
      ...Object.entries(stats?.byDepartment || {}).map(([dept, count]) => [dept, count]),
      ['--- Salary Ranges ---', ''],
      ...Object.entries(stats?.salaryRanges || {}).map(([range, count]) => [range, count]),
      ['--- Stats Summary ---', ''],
    ];

    const csv = Papa.unparse(exportData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button 
      variant="outlined" 
      startIcon={<DownloadIcon />}
      onClick={handleExport}
      disabled={!stats}
    >
      Export CSV
    </Button>
  );
};

