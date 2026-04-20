import { useQuery } from '@tanstack/react-query';
import { getEmployeeStats, getRecentEmployees } from './dashboard.api';
import { EmployeeStats } from './dashboard.types';
import { Employee } from '../employees/employees.types';

export const useDashboardStats = () => {
  return useQuery<EmployeeStats>({
    queryKey: ['stats'],
    queryFn: getEmployeeStats,
  });
};

export const useRecentEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ['recentEmployees'],
    queryFn: getRecentEmployees,
  });
};

