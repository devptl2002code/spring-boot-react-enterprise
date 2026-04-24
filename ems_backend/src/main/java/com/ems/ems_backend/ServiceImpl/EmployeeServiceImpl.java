package com.ems.ems_backend.ServiceImpl;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Repository.EmployeeRepository;
import com.ems.ems_backend.Service.EmployeeService;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;
import java.util.UUID;
import com.ems.ems_backend.Entity.EmployeeStats;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Value("${file.upload-dir:uploads/employees}")
    private String uploadDir;

    @Override
    public Employee createEmployee(Employee employee, MultipartFile document) {
        if (document != null && !document.isEmpty()) {
            String storedName = storeFile(document);
            employee.setDocumentUrl(storedName);
            employee.setDocumentName(document.getOriginalFilename());
        }
        return employeeRepository.save(employee);
    }

    @Override
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee updateEmployee(Long id, Employee updatedEmployee, MultipartFile document) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            emp.setFirstName(updatedEmployee.getFirstName());
            emp.setLastName(updatedEmployee.getLastName());
            emp.setEmail(updatedEmployee.getEmail());
            emp.setDepartment(updatedEmployee.getDepartment());
            emp.setSalary(updatedEmployee.getSalary());

            if (document != null && !document.isEmpty()) {
                // Delete old document if exists
                if (emp.getDocumentUrl() != null) {
                    deleteFile(emp.getDocumentUrl());
                }
                String storedName = storeFile(document);
                emp.setDocumentUrl(storedName);
                emp.setDocumentName(document.getOriginalFilename());
            }

            return employeeRepository.save(emp);
        }
        throw new RuntimeException("Employee not found");
    }

    @Override
    public void deleteEmployee(Long id) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            if (emp.getDocumentUrl() != null) {
                deleteFile(emp.getDocumentUrl());
            }
            employeeRepository.deleteById(id);
        }
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

    @Override
    public byte[] getEmployeeDocument(Long id) {
        Optional<Employee> existing = employeeRepository.findById(id);
        if (existing.isPresent()) {
            Employee emp = existing.get();
            if (emp.getDocumentUrl() != null) {
                try {
                    Path path = Paths.get(uploadDir).resolve(emp.getDocumentUrl()).toAbsolutePath().normalize();
                    return Files.readAllBytes(path);
                } catch (IOException e) {
                    throw new RuntimeException("Failed to read document", e);
                }
            }
        }
        throw new RuntimeException("Document not found");
    }

    private String storeFile(MultipartFile file) {
        try {
            Path dirPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            if (!Files.exists(dirPath)) {
                Files.createDirectories(dirPath);
            }
            String storedName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = dirPath.resolve(storedName);
            Files.copy(file.getInputStream(), filePath);
            return storedName;
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file", e);
        }
    }

    private void deleteFile(String fileName) {
        try {
            Path path = Paths.get(uploadDir).resolve(fileName).toAbsolutePath().normalize();
            Files.deleteIfExists(path);
        } catch (IOException e) {
            // Log error but don't throw
            System.err.println("Failed to delete file: " + fileName);
        }
    }
}

