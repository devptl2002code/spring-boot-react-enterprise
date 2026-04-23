package com.ems.ems_backend.Controller;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Entity.EmployeeStats;
import com.ems.ems_backend.Service.EmployeeService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;


@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @GetMapping("/my-info")
    public String currentUser(Authentication authentication) {
        return authentication.getName();
    }

    // Only ADMIN or HR can create
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PostMapping
    public Employee create(@RequestBody Employee employee) {
        return employeeService.createEmployee(employee);
    }

    // Any logged-in user
    @GetMapping
    public List<Employee> getAll() {
        return employeeService.getAllEmployees();
    }

    // Any logged-in user
    @GetMapping("/stats")
    public EmployeeStats getStats() {
        return employeeService.getEmployeeStats();
    }

    // Only ADMIN or HR
    @PreAuthorize("hasAnyRole('ADMIN','HR')")
    @PutMapping("/{id}")
    public Employee update(@PathVariable Long id, @RequestBody Employee employee) {
        return employeeService.updateEmployee(id, employee);
    }

    // Only ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }
}