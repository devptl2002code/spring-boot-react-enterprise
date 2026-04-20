package com.ems.ems_backend.Repository;

import com.ems.ems_backend.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    @Query("SELECT e.department, COUNT(e) FROM Employee e GROUP BY e.department")
    List<Object[]> countByDepartment();

    @Query("SELECT COALESCE(AVG(e.salary), 0.0) FROM Employee e")
    Double averageSalary();

    @Query("SELECT COUNT(e) FROM Employee e")
    long countAll();

    @Query("SELECT e.salary FROM Employee e ORDER BY e.id DESC LIMIT 10")
    List<Double> recentSalaries();

    // Salary ranges using CASE
    @Query("SELECT " +
           "CASE " +
           "  WHEN e.salary < 50000 THEN '<50k' " +
           "  WHEN e.salary BETWEEN 50000 AND 100000 THEN '50-100k' " +
           "  ELSE '>100k' " +
           "END as range, " +
           "COUNT(e) as count " +
           "FROM Employee e " +
           "GROUP BY range")
    List<Object[]> salaryRangeCounts();
}
