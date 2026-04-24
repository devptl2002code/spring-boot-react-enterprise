package com.ems.ems_backend.Controller;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Entity.EmployeeStats;
import com.ems.ems_backend.Service.EmployeeService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
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
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Employee create(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("department") String department,
            @RequestParam("salary") Double salary,
            @RequestParam(value = "document", required = false) MultipartFile document) {
        Employee employee = new Employee();
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        employee.setDepartment(department);
        employee.setSalary(salary);
        return employeeService.createEmployee(employee, document);
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
    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public Employee update(
            @PathVariable Long id,
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("email") String email,
            @RequestParam("department") String department,
            @RequestParam("salary") Double salary,
            @RequestParam(value = "document", required = false) MultipartFile document) {
        Employee employee = new Employee();
        employee.setId(id);
        employee.setFirstName(firstName);
        employee.setLastName(lastName);
        employee.setEmail(email);
        employee.setDepartment(department);
        employee.setSalary(salary);
        return employeeService.updateEmployee(id, employee, document);
    }

    // Only ADMIN
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        employeeService.deleteEmployee(id);
    }

    @GetMapping("/{id}/document")
    public ResponseEntity<byte[]> getDocument(@PathVariable Long id) {
        byte[] data = employeeService.getEmployeeDocument(id);
        Employee employee = employeeService.getAllEmployees().stream()
                .filter(e -> e.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + employee.getDocumentName() + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(data);
    }
}

