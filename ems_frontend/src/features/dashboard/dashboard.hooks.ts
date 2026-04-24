import { useQuery } from '@tanstack/react-query';
import { getEmployeeStats } from './dashboard.api';
import { EmployeeStats } from './dashboard.types';

export const useDashboardStats = () => {
  return useQuery<EmployeeStats>({
    queryKey: ['stats'],
    queryFn: getEmployeeStats,
  });
};