package com.ems.ems_backend.Entity;

import java.util.Map;

public record EmployeeStats(
    long totalCount,
    double avgSalary,
    Map<String, Long> byDepartment,
    Map<String, Long> byRole,
    Map<String, Long> salaryRanges
) {}

