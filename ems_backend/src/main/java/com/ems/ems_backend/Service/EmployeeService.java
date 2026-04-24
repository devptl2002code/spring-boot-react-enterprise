package com.ems.ems_backend.Service;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Entity.EmployeeStats;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface EmployeeService {
    Employee createEmployee(Employee employee, MultipartFile document);
    List<Employee> getAllEmployees();
    Employee updateEmployee(Long id, Employee updatedEmployee, MultipartFile document);
    void deleteEmployee(Long id);
    EmployeeStats getEmployeeStats();
    byte[] getEmployeeDocument(Long id);
}
