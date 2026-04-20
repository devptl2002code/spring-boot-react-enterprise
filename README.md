# 🏢 Enterprise Management System (EMS)

> A modern, full-stack enterprise application for managing employees with role-based access control, JWT authentication, and real-time analytics.

![License](https://img.shields.io/badge/license-MIT-blue)
![Java](https://img.shields.io/badge/Java-17-orange)
![Spring%20Boot](https://img.shields.io/badge/Spring%20Boot-3.5.11-green)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [Prerequisites](#prerequisites)
- [Installation](#-installation)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Authentication Flow](#-authentication-flow)
- [Deployment](#-deployment)
- [Development Guidelines](#-development-guidelines)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#license)

---

## Overview

**EMS** is a production-ready enterprise management system built with a modern tech stack. It provides:

- 👤 **Employee Management**: Create, read, update, delete employee records
- 🔐 **Role-Based Access Control (RBAC)**: Admin and User roles with different permissions
- 🔑 **JWT Authentication**: Secure token-based authentication
- 📊 **Dashboard & Analytics**: Real-time employee statistics and trends
- 📈 **Data Export**: Export employee data in CSV format
- 🎨 **Responsive UI**: Mobile-first design with Material-UI
- ⚡ **Real-time State Management**: React Query for server state management
- 🌐 **CORS Enabled**: Secure cross-origin requests

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Client Layer (React)                         │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Pages: Login | Dashboard | Employees | NotFound | Error    │   │
│  │  Components: Forms | Tables | Charts | Dialogs              │   │
│  │  State: React Query | Context API | Local State             │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓ REST API (Axios)
┌─────────────────────────────────────────────────────────────────────┐
│                    API Gateway & Security Layer                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  JWT Filter | CORS Config | Security Config                 │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                    Backend Layer (Spring Boot)                       │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Controllers: Auth | Employee                               │   │
│  │  Services: EmployeeService | AuthService                    │   │
│  │  Repositories: EmployeeRepository | UserRepository          │   │
│  │  Security: JwtUtil | JwtFilter | SecurityConfig             │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓ JPA/Hibernate
┌─────────────────────────────────────────────────────────────────────┐
│                      Data Access Layer (JPA)                         │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Entities: Employee | User | Role | EmployeeStats           │   │
│  │  Relationships: User → Role (Many-to-One)                   │   │
│  │                Employee → Department (Many-to-One)          │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
                                  ↓
┌─────────────────────────────────────────────────────────────────────┐
│                      Database (H2 / PostgreSQL)                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │  Tables: users | roles | employees | employee_stats         │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

### Authentication Flow Diagram

```
┌──────────────┐         ┌──────────────────┐         ┌─────────────┐
│   Frontend   │         │   Auth Service   │         │  Database   │
└──────────────┘         └──────────────────┘         └─────────────┘
        │                         │                            │
        │─── Login (email/pwd) ──→│                            │
        │                         │─── Query User ────────────→│
        │                         │                            │
        │                         │←── User Found ────────────│
        │                         │                            │
        │                         │─ Validate Password & JWT ─│
        │                         │                            │
        │←─ JWT Token + Refresh ─│                            │
        │                         │                            │
        │─ Store Token (Storage) │                            │
        │                         │                            │
        │─ Next API Request ─────→│                            │
        │  (+ Authorization Header)                            │
        │                         │                            │
        │                         │─ Verify JWT ──────────────│
        │                         │                            │
        │←───── Response ────────│                            │
        │                         │                            │
```

---

## Project Structure

```
spring-boot-react-enterprise/
│
├── ems_backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/java/com/ems/ems_backend/
│   │   │   ├── Config/                   # Configuration Classes
│   │   │   │   ├── SecurityConfig.java   # Spring Security Setup
│   │   │   │   ├── CorsConfig.java       # CORS Configuration
│   │   │   │   └── DataInitializer.java  # Initial Data Setup
│   │   │   │
│   │   │   ├── Controller/               # REST Controllers
│   │   │   │   ├── AuthController.java   # Auth endpoints
│   │   │   │   └── EmployeeController.java
│   │   │   │
│   │   │   ├── Service/                  # Business Logic
│   │   │   │   └── EmployeeService.java
│   │   │   │
│   │   │   ├── ServiceImpl/               # Service Implementations
│   │   │   │   └── EmployeeServiceImpl.java
│   │   │   │
│   │   │   ├── Repository/               # Data Access Layer
│   │   │   │   ├── EmployeeRepository.java
│   │   │   │   └── UserRepository.java
│   │   │   │
│   │   │   ├── Entity/                   # JPA Entities
│   │   │   │   ├── Employee.java
│   │   │   │   ├── User.java
│   │   │   │   ├── Role.java
│   │   │   │   └── EmployeeStats.java
│   │   │   │
│   │   │   ├── Security/                 # Security Components
│   │   │   │   ├── JwtUtil.java          # JWT Token Management
│   │   │   │   └── JwtFilter.java        # JWT Request Filter
│   │   │   │
│   │   │   └── EmsBackendApplication.java # Main Application Class
│   │   │
│   │   ├── resources/
│   │   │   ├── application.properties    # App Configuration
│   │   │   └── data/
│   │   │       └── employees.json        # Initial Employee Data
│   │   │
│   │   └── test/                         # Unit & Integration Tests
│   │
│   ├── pom.xml                           # Maven Configuration
│   └── mvnw / mvnw.cmd                   # Maven Wrapper
│
├── ems_frontend/                         # React Frontend
│   ├── src/
│   │   ├── index.css                     # Global Styles
│   │   ├── main.tsx                      # React Entry Point
│   │   ├── vite-env.d.ts                 # Vite Types
│   │   │
│   │   ├── app/
│   │   │   ├── router.tsx                # Route Configuration
│   │   │   ├── providers.tsx             # Context Providers
│   │   │   └── providers/
│   │   │       ├── QueryProvider.tsx     # React Query Setup
│   │   │       └── SnackbarProvider.tsx  # Notification Provider
│   │   │
│   │   ├── core/
│   │   │   ├── api/
│   │   │   │   └── axios.ts              # API Client Setup
│   │   │   ├── config/
│   │   │   │   └── env.ts                # Environment Variables
│   │   │   ├── routes/
│   │   │   │   ├── ProtectedRoute.tsx    # Route Protection
│   │   │   │   └── RoleGuard.tsx         # Role-based Access
│   │   │   └── theme/
│   │   │       ├── theme.ts              # MUI Theme Config
│   │   │       └── ThemeContext.tsx      # Theme Provider
│   │   │
│   │   ├── features/
│   │   │   ├── auth/                     # Authentication Module
│   │   │   │   ├── api/
│   │   │   │   │   └── auth.api.ts
│   │   │   │   ├── context/
│   │   │   │   │   └── AuthContext.tsx
│   │   │   │   ├── hooks/
│   │   │   │   │   ├── useAuth.ts
│   │   │   │   │   └── useLogin.ts
│   │   │   │   ├── pages/
│   │   │   │   │   └── LoginPage.tsx
│   │   │   │   └── types/
│   │   │   │       └── auth.types.ts
│   │   │   │
│   │   │   ├── dashboard/                # Dashboard Module
│   │   │   │   ├── dashboard.api.ts
│   │   │   │   ├── dashboard.hooks.ts
│   │   │   │   ├── dashboard.types.ts
│   │   │   │   ├── DashboardPage.tsx
│   │   │   │   └── components/
│   │   │   │       ├── DashboardCharts.tsx
│   │   │   │       ├── ExportCSV.tsx
│   │   │   │       ├── StatsCard.tsx
│   │   │   │       └── TrendChart.tsx
│   │   │   │
│   │   │   ├── employees/                # Employee Management Module
│   │   │   │   ├── employees.api.ts
│   │   │   │   ├── employees.hooks.ts
│   │   │   │   ├── employees.types.ts
│   │   │   │   ├── EmployeesPage.tsx
│   │   │   │   ├── employeeTableColumns.tsx
│   │   │   │   ├── useEmployees.ts
│   │   │   │   └── components/
│   │   │   │       ├── DeleteConfirmationDialog.tsx
│   │   │   │       ├── EmployeeFormDialog.tsx
│   │   │   │       ├── EmployeeHeader.tsx
│   │   │   │       ├── EmployeePagination.tsx
│   │   │   │       ├── EmployeeSearch.tsx
│   │   │   │       └── EmployeeTable.tsx
│   │   │   │
│   │   │   └── test/
│   │   │       └── pages/
│   │   │           └── TestQueryPage.tsx
│   │   │
│   │   └── shared/                       # Shared Components
│   │       └── components/
│   │           ├── NotFoundPage.tsx
│   │           ├── UnauthorizedPage.tsx
│   │           └── layout/
│   │               └── AppLayout.tsx
│   │
│   ├── public/                           # Static Assets
│   ├── package.json                      # NPM Dependencies
│   ├── tsconfig.json                     # TypeScript Config
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vite.config.ts                    # Vite Config
│   ├── eslint.config.js                  # ESLint Rules
│   └── index.html                        # HTML Template
│
├── notes/                                # Documentation Notes
│   └── prompt.txt
│
├── README.md                             # This file
└── LICENSE

```

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Java** | 17 | Core Language |
| **Spring Boot** | 3.5.11 | Framework |
| **Spring Security** | Latest | Authentication & Authorization |
| **Spring Data JPA** | Latest | ORM & Data Access |
| **JWT (JJWT)** | 0.11.5 | Token-based Authentication |
| **Hibernate** | Latest | Object-Relational Mapping |
| **Lombok** | Latest | Reduce Boilerplate Code |
| **H2 Database** | Latest | In-Memory Database (Dev) |
| **Maven** | 3.x | Build Tool |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| **React** | 19 | UI Library |
| **TypeScript** | 5.9 | Type Safety |
| **Vite** | 7.3 | Build Tool & Dev Server |
| **React Router** | 7.13 | Client-side Routing |
| **Material-UI (MUI)** | 7.3 | Component Library |
| **React Query** | 5.90 | Server State Management |
| **Axios** | 1.13 | HTTP Client |
| **Recharts** | 3.8 | Data Visualization |
| **JWT Decode** | 4.0 | JWT Token Decoding |
| **PapaParse** | 5.5 | CSV Export/Import |
| **ESLint** | 9.39 | Code Linting |
| **Prettier** | 3.8 | Code Formatting |

### Database
| Option | Details |
|--------|---------|
| **H2** | Development (In-Memory) |
| **PostgreSQL** | Production Ready |
| **MySQL** | Production Ready |

---

## ✨ Features

### User Authentication & Authorization
- ✅ User registration and login
- ✅ JWT token-based authentication
- ✅ Role-based access control (RBAC) - Admin & User roles
- ✅ Secure password handling
- ✅ Token refresh mechanism
- ✅ Protected API endpoints

### Employee Management
- ✅ Create new employee records
- ✅ Read/View all employees with pagination
- ✅ Update employee information
- ✅ Delete employee records
- ✅ Search employees by name, email, department
- ✅ Filter by status, role, department
- ✅ Bulk operations support
- ✅ Data validation and error handling

### Dashboard & Analytics
- ✅ Real-time employee statistics
- ✅ Employee count by department
- ✅ Employee status overview
- ✅ Salary statistics and trends
- ✅ Performance metrics visualization
- ✅ Interactive charts (Bar, Line, Pie charts)
- ✅ Trend analysis

### Data Management
- ✅ Export employee data to CSV
- ✅ Pagination for large datasets
- ✅ Advanced filtering and sorting
- ✅ Real-time data synchronization
- ✅ Data caching with React Query

### User Experience
- ✅ Responsive design (Mobile, Tablet, Desktop)
- ✅ Dark/Light theme support
- ✅ Toast notifications for user feedback
- ✅ Loading states and skeletons
- ✅ Error boundaries
- ✅ Confirmation dialogs for critical actions
- ✅ Intuitive navigation

### Code Quality
- ✅ TypeScript for type safety
- ✅ ESLint for code linting
- ✅ Prettier for code formatting
- ✅ Component-based architecture
- ✅ Custom React hooks
- ✅ Modular file structure

---

## Prerequisites

### System Requirements
- **Node.js**: 18.x or higher
- **Java**: 17 or higher
- **Maven**: 3.6+ (or use mvnw wrapper)
- **npm**: 9.x or higher
- **Git**: Latest stable version

### Tools (Optional)
- Postman or Insomnia (for API testing)
- VSCode with recommended extensions
- PostgreSQL (for production database)

---

## 🚀 Installation

### Backend Setup

```bash
# Navigate to backend directory
cd ems_backend

# Option 1: Using Maven wrapper (Recommended)
# On Windows
mvnw.cmd clean install

# On macOS/Linux
./mvnw clean install

# Option 2: Using installed Maven
mvn clean install

# Build the project
mvn clean package
```

### Frontend Setup

```bash
# Navigate to frontend directory
cd ems_frontend

# Install dependencies
npm install

# Install specific versions if needed
npm install --legacy-peer-deps
```

### Database Setup (Optional - for PostgreSQL)

```bash
# Create database
createdb ems_database

# Update application.properties with PostgreSQL credentials
# ems_backend/src/main/resources/application.properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ems_database
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQL10Dialect
```

---

## 🏃 Running the Application

### Start Backend Server

```bash
# Option 1: Using Maven (Development mode)
cd ems_backend
mvn spring-boot:run

# Option 2: Running JAR file (Production)
java -jar target/ems_backend-0.0.1-SNAPSHOT.jar

# Backend will start at: http://localhost:8080
```

### Start Frontend Dev Server

```bash
# In a new terminal
cd ems_frontend

# Start development server
npm run dev

# Frontend will start at: http://localhost:5173
```

### Build for Production

```bash
# Backend - Create executable JAR
cd ems_backend
mvn clean package -DskipTests

# Frontend - Build optimized bundle
cd ems_frontend
npm run build

# Output: dist/ folder with production-ready files
```

---

## 📚 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}

Response (200 OK):
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "...",
  "userId": 1,
  "email": "user@example.com",
  "role": "ADMIN"
}
```

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}

Response (201 Created):
{
  "id": 2,
  "email": "newuser@example.com",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Employee Endpoints

#### Get All Employees
```http
GET /employees?page=0&size=10&sortBy=name
Authorization: Bearer {token}

Response (200 OK):
{
  "content": [
    {
      "id": 1,
      "firstName": "Jane",
      "lastName": "Doe",
      "email": "jane@example.com",
      "department": "Engineering",
      "salary": 85000,
      "status": "ACTIVE",
      "joinDate": "2023-01-15"
    }
  ],
  "totalElements": 50,
  "totalPages": 5,
  "currentPage": 0
}
```

#### Get Employee by ID
```http
GET /employees/{id}
Authorization: Bearer {token}

Response (200 OK):
{
  "id": 1,
  "firstName": "Jane",
  "lastName": "Doe",
  "email": "jane@example.com",
  "department": "Engineering",
  "salary": 85000,
  "status": "ACTIVE",
  "joinDate": "2023-01-15"
}
```

#### Create Employee
```http
POST /employees
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "department": "Sales",
  "salary": 75000,
  "status": "ACTIVE"
}

Response (201 Created):
{
  "id": 51,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "department": "Sales",
  "salary": 75000,
  "status": "ACTIVE",
  "joinDate": "2024-04-20"
}
```

#### Update Employee
```http
PUT /employees/{id}
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Smith",
  "department": "Marketing",
  "salary": 80000,
  "status": "ACTIVE"
}

Response (200 OK):
{
  "id": 51,
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com",
  "department": "Marketing",
  "salary": 80000,
  "status": "ACTIVE",
  "joinDate": "2024-04-20"
}
```

#### Delete Employee
```http
DELETE /employees/{id}
Authorization: Bearer {token}

Response (204 No Content)
```

#### Get Employee Statistics
```http
GET /employees/stats
Authorization: Bearer {token}

Response (200 OK):
{
  "totalEmployees": 50,
  "activeEmployees": 48,
  "inactiveEmployees": 2,
  "averageSalary": 78500,
  "employeesByDepartment": {
    "Engineering": 15,
    "Sales": 12,
    "Marketing": 10,
    "HR": 8,
    "Finance": 5
  }
}
```

### Error Responses

```http
HTTP/1.1 400 Bad Request
{
  "error": "Bad Request",
  "message": "Invalid email format",
  "timestamp": "2024-04-20T10:30:00"
}

HTTP/1.1 401 Unauthorized
{
  "error": "Unauthorized",
  "message": "Invalid or expired token",
  "timestamp": "2024-04-20T10:30:00"
}

HTTP/1.1 403 Forbidden
{
  "error": "Forbidden",
  "message": "User does not have permission",
  "timestamp": "2024-04-20T10:30:00"
}

HTTP/1.1 404 Not Found
{
  "error": "Not Found",
  "message": "Employee with id 999 not found",
  "timestamp": "2024-04-20T10:30:00"
}
```

---

## 📊 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

### Roles Table
```sql
CREATE TABLE roles (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    description VARCHAR(255)
);
```

### Employees Table
```sql
CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    department VARCHAR(100),
    salary DECIMAL(10, 2),
    status VARCHAR(20),
    join_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### EmployeeStats Table
```sql
CREATE TABLE employee_stats (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    total_employees INT,
    active_employees INT,
    average_salary DECIMAL(10, 2),
    month VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔐 Authentication Flow

```
1. User enters credentials (email/password)
                ↓
2. Frontend sends POST /auth/login
                ↓
3. Backend validates credentials
                ↓
4. Backend generates JWT token (valid for 15 minutes)
                ↓
5. Frontend receives token & stores in localStorage
                ↓
6. Frontend includes token in Authorization header
   (Bearer {token})
                ↓
7. Backend validates token in JwtFilter
                ↓
8. If valid: Request proceeds
   If invalid: 401 Unauthorized response
                ↓
9. Token expires: Use refresh token to get new token
                ↓
10. If refresh fails: User must login again
```

---

## 🌐 Deployment

### Deploy Backend to Production

#### Using Docker
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/ems_backend-0.0.1-SNAPSHOT.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

```bash
docker build -t ems-backend:1.0 .
docker run -p 8080:8080 ems-backend:1.0
```

#### Using Traditional Server
```bash
# Copy JAR to server
scp target/ems_backend-0.0.1-SNAPSHOT.jar user@server:/opt/ems/

# Run on server
java -jar /opt/ems/ems_backend-0.0.1-SNAPSHOT.jar
```

### Deploy Frontend to Production

#### Using Vercel
```bash
npm i -g vercel
vercel --prod
```

#### Using Netlify
```bash
npm run build
# Drag and drop dist/ folder to Netlify
```

#### Using Traditional Web Server
```bash
# Build
npm run build

# Copy to web server
scp -r dist/* user@server:/var/www/html/
```

#### Using Docker
```dockerfile
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

---

## 🛠 Development Guidelines

### Code Style & Standards

#### Backend (Java)
- Follow Google Java Style Guide
- Use meaningful variable names
- Keep methods small and focused
- Add Javadoc comments for public APIs
- Use lombok annotations to reduce boilerplate

#### Frontend (TypeScript/React)
- Use ESLint configuration
- Format code with Prettier
- Use functional components with hooks
- Create custom hooks for reusable logic
- Keep components focused and maintainable
- Use proper TypeScript types
- Avoid any types

### Project Conventions

#### Naming Conventions
- **Java Classes**: PascalCase (e.g., `UserService`)
- **Java Methods**: camelCase (e.g., `getUserById()`)
- **TypeScript Files**: kebab-case (e.g., `user-service.ts`)
- **React Components**: PascalCase (e.g., `UserTable.tsx`)
- **Constants**: UPPER_SNAKE_CASE

#### Folder Organization
- Features grouped by domain
- API calls in separate api file
- Hooks in hooks folder
- Types in types file
- Components in components folder

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/employee-export

# Make changes and commit
git add .
git commit -m "feat: add CSV export for employees"

# Push to remote
git push origin feature/employee-export

# Create Pull Request
# - Add description
# - Request reviewers
# - Resolve reviews
# - Merge after approval
```

---

## 🐛 Troubleshooting

### Backend Issues

#### Port 8080 Already in Use
```bash
# Find process using port 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill process
kill -9 PID  # macOS/Linux
taskkill /PID PID /F  # Windows

# Or change port in application.properties
server.port=8081
```

#### Database Connection Issues
```
Error: Unable to get a connection, pool error
Solution:
1. Verify database server is running
2. Check credentials in application.properties
3. Ensure database exists
4. Check firewall rules
```

#### JWT Token Expired
```
Error: 401 Unauthorized
Solution:
1. Use refresh token to get new token
2. User must login again if refresh token expired
3. Check token expiration in JwtUtil
```

### Frontend Issues

#### Port 5173 Already in Use
```bash
# Kill process or use different port
npm run dev -- --port 3000
```

#### CORS Errors
```
Error: Access to XMLHttpRequest blocked by CORS policy
Solution:
1. Verify CORS config in backend (CorsConfig.java)
2. Ensure origin is whitelisted
3. Check API base URL in axios config
```

#### Token Not Persisting
```
Issue: Logged out after page refresh
Solution:
1. Check localStorage is enabled
2. Verify token is saved after login
3. Check token key name in auth context
```

#### Build Errors
```bash
# Clear node_modules and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

---

## 📖 Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [JWT.io](https://jwt.io)
- [Material-UI Documentation](https://mui.com)
- [React Query Documentation](https://tanstack.com/query/latest)
- [Vite Documentation](https://vitejs.dev)

---

## 📦 Dependencies & Licenses

This project uses open-source dependencies. Below is a complete list of all dependencies and their licenses:

### Backend Dependencies (Java/Maven)

| Dependency | Version | License | Purpose |
|-----------|---------|---------|---------|
| **Spring Boot Starters** | 3.5.11 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Web, Security, Data JPA frameworks |
| **Spring Security** | Latest | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Authentication & Authorization |
| **Spring Data JPA** | Latest | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Database abstraction layer |
| **JJWT (JSON Web Token)** | 0.11.5 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | JWT token handling |
| **Lombok** | Latest | [MIT](https://opensource.org/licenses/MIT) | Reduce boilerplate code |
| **H2 Database** | Latest | [MPL 2.0](https://www.mozilla.org/en-US/MPL/2.0/) / [EPL 1.0](https://opensource.org/licenses/EPL-1.0) | In-memory database |
| **Spring Boot Test** | Latest | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Unit testing framework |
| **Spring Security Test** | Latest | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Security testing utilities |

### Frontend Dependencies (Node.js/NPM)

#### Core Framework

| Dependency | Version | License | Purpose |
|-----------|---------|---------|---------|
| **React** | 19.2.0 | [MIT](https://opensource.org/licenses/MIT) | UI library |
| **React DOM** | 19.2.0 | [MIT](https://opensource.org/licenses/MIT) | React rendering to DOM |
| **React Router DOM** | 7.13.1 | [MIT](https://opensource.org/licenses/MIT) | Client-side routing |
| **TypeScript** | 5.9.3 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Type safety for JavaScript |
| **Vite** | 7.3.1 | [MIT](https://opensource.org/licenses/MIT) | Build tool & dev server |
| **@vitejs/plugin-react** | 5.1.1 | [MIT](https://opensource.org/licenses/MIT) | React support for Vite |

#### UI & Styling

| Dependency | Version | License | Purpose |
|-----------|---------|---------|---------|
| **Material-UI (MUI)** | 7.3.10 | [MIT](https://opensource.org/licenses/MIT) | Component library |
| **Material-UI Icons** | 7.3.8 | [MIT](https://opensource.org/licenses/MIT) | Icon collection |
| **Material-UI X Data Grid** | 8.27.1 | [MIT](https://opensource.org/licenses/MIT) | Data table component |
| **Emotion React** | 11.14.0 | [MIT](https://opensource.org/licenses/MIT) | CSS-in-JS library |
| **Emotion Styled** | 11.14.1 | [MIT](https://opensource.org/licenses/MIT) | Styled components |

#### State Management & Data Fetching

| Dependency | Version | License | Purpose |
|-----------|---------|---------|---------|
| **TanStack Query (React Query)** | 5.90.21 | [MIT](https://opensource.org/licenses/MIT) | Server state management |
| **TanStack Query DevTools** | 5.91.3 | [MIT](https://opensource.org/licenses/MIT) | Development tools for Query |
| **TanStack React Table** | 8.21.3 | [MIT](https://opensource.org/licenses/MIT) | Headless table library |
| **Axios** | 1.13.5 | [MIT](https://opensource.org/licenses/MIT) | HTTP client |

#### Utilities

| Dependency | Version | License | Purpose |
|-----------|---------|---------|---------|
| **JWT Decode** | 4.0.0 | [MIT](https://opensource.org/licenses/MIT) | Decode JWT tokens |
| **PapaParse** | 5.5.3 | [MIT](https://opensource.org/licenses/MIT) | CSV parsing & generation |
| **Recharts** | 3.8.1 | [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) | Data visualization charts |

#### Development Tools

| Dependency | Version | License | Purpose |
|-----------|---------|---------|---------|
| **ESLint** | 9.39.3 | [MIT](https://opensource.org/licenses/MIT) | Code linting |
| **ESLint Config Prettier** | 10.1.8 | [MIT](https://opensource.org/licenses/MIT) | ESLint + Prettier integration |
| **ESLint JS** | 9.39.1 | [MIT](https://opensource.org/licenses/MIT) | Core ESLint rules |
| **ESLint Plugin React Hooks** | 7.0.1 | [MIT](https://opensource.org/licenses/MIT) | React Hooks linting rules |
| **ESLint Plugin React Refresh** | 0.4.24 | [MIT](https://opensource.org/licenses/MIT) | Fast Refresh support |
| **Prettier** | 3.8.1 | [MIT](https://opensource.org/licenses/MIT) | Code formatter |
| **TypeScript ESLint** | 8.48.0 | [MIT](https://opensource.org/licenses/MIT) | TypeScript linting rules |
| **@types/React** | 19.2.7 | [MIT](https://opensource.org/licenses/MIT) | React TypeScript types |
| **@types/React DOM** | 19.2.3 | [MIT](https://opensource.org/licenses/MIT) | React DOM TypeScript types |
| **@types/Node** | 24.10.13 | [MIT](https://opensource.org/licenses/MIT) | Node.js TypeScript types |
| **Globals** | 16.5.0 | [MIT](https://opensource.org/licenses/MIT) | Global variables |

### License Compliance

**✅ This project is fully compliant with all open-source licenses used.**

All dependencies are licensed under either:
- **MIT License** - Permissive license allowing commercial use with attribution
- **Apache 2.0** - Permissive license with explicit patent grants
- **MPL 2.0** - Mozilla Public License for H2 Database

**Commercial Use**: ✅ **Allowed** - All dependencies can be used commercially
**Modifications**: ✅ **Allowed** - You can modify the code
**Distribution**: ✅ **Allowed** - You can redistribute the software
**Patent Use**: ✅ **Protected** - Patent rights are protected where applicable

### Attribution

We appreciate all the open-source projects that make this application possible. Please refer to each dependency's repository for more information:

- [Spring Framework](https://spring.io)
- [React](https://react.dev)
- [Material-UI](https://mui.com)
- [TanStack Query](https://tanstack.com/query)
- [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vitejs.dev)
- [Axios](https://axios-http.com)
- [Recharts](https://recharts.org)

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/your-feature`
3. **Commit** changes: `git commit -m "feat: add your feature"`
4. **Push** to branch: `git push origin feature/your-feature`
5. **Submit** a Pull Request

### Pull Request Guidelines
- Include clear description of changes
- Link related issues
- Ensure tests pass
- Update documentation if needed
- Get approval from maintainers before merge

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 📞 Support

For issues, questions, or suggestions:

- **GitHub Issues**: Create an issue in the repository
- **Email**: support@example.com
- **Documentation**: Check the notes/ folder for additional docs

---

## 🙏 Acknowledgments

- Spring Boot Team
- React Team
- Material-UI Community
- All contributors

---

**Last Updated**: April 20, 2026
**Version**: 1.0.0
