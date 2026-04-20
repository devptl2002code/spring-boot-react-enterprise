package com.ems.ems_backend.Service;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Entity.EmployeeStats;
import java.util.List;

public interface EmployeeService {
    Employee createEmployee(Employee employee);
    List<Employee> getAllEmployees();
    Employee updateEmployee(Long id, Employee updatedEmployee);
    void deleteEmployee(Long id);
    EmployeeStats getEmployeeStats();
}
