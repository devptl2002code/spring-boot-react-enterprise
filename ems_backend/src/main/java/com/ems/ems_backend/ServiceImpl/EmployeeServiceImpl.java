package com.ems.ems_backend.ServiceImpl;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Repository.EmployeeRepository;
import com.ems.ems_backend.Service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import com.ems.ems_backend.Entity.EmployeeStats;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public Employee createEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(Long id, Employee updatedEmployee) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            emp.setFirstName(updatedEmployee.getFirstName());
            emp.setLastName(updatedEmployee.getLastName());
            emp.setEmail(updatedEmployee.getEmail());
            emp.setDepartment(updatedEmployee.getDepartment());
            emp.setSalary(updatedEmployee.getSalary());
            return employeeRepository.save(emp);
        }
        throw new RuntimeException("Employee not found");
    }

@Override
    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }

    @Override
    public EmployeeStats getEmployeeStats() {
        long totalCount = employeeRepository.countAll();
        double avgSalary = employeeRepository.averageSalary() != null ? employeeRepository.averageSalary() : 0.0;

        // By department
        Map<String, Long> byDepartment = new HashMap<>();
        for (Object[] row : employeeRepository.countByDepartment()) {
            byDepartment.put((String) row[0], (Long) row[1]);
        }

        // Salary ranges
        Map<String, Long> salaryRanges = new HashMap<>();
        for (Object[] row : employeeRepository.salaryRangeCounts()) {
            salaryRanges.put((String) row[0], (Long) row[1]);
        }

        // byRole: since no role in Employee, use department as proxy or empty
        Map<String, Long> byRole = new HashMap<>(); // TODO: extend if User/Role linked

        return new EmployeeStats(totalCount, avgSalary, byDepartment, byRole, salaryRanges);
    }
}
