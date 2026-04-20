package com.ems.ems_backend.Config;

import com.ems.ems_backend.Entity.Employee;
import com.ems.ems_backend.Repository.EmployeeRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.util.List;

@Configuration
public class DataInitializer {

    @Bean
    public ApplicationRunner seedEmployeeData(EmployeeRepository employeeRepository) {
        return args -> {
            if (employeeRepository.count() == 0) {
                Resource resource = new ClassPathResource("data/employees.json");
                ObjectMapper objectMapper = new ObjectMapper();
                List<Employee> employees = objectMapper.readValue(resource.getInputStream(), new TypeReference<List<Employee>>() {
                });
                employeeRepository.saveAll(employees);
            }
        };
    }
}
