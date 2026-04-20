# Contributing to Enterprise Management System (EMS)

First off, thanks for considering contributing to the Enterprise Management System! It's people like you that make EMS such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code.

---

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps which reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots and animated GIFs if possible**
* **Include your environment details** (OS, browser, Java version, Node version)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and expected behavior**
* **Explain why this enhancement would be useful**
* **List some other applications where this enhancement exists**

### Pull Requests

* Fill in the required template
* Follow the TypeScript/Java style guides
* Include appropriate test cases
* Update documentation as needed
* Add entry to CHANGELOG if applicable

---

## Development Setup

### Backend Development

```bash
cd ems_backend

# Build the project
mvn clean install

# Run in development mode
mvn spring-boot:run

# Run tests
mvn test

# Run with specific profile
mvn spring-boot:run -Dspring-boot.run.arguments="--spring.profiles.active=dev"
```

### Frontend Development

```bash
cd ems_frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Style Guides

### Java/Backend

* Follow [Google Java Style Guide](https://google.github.io/styleguide/javaguide.html)
* Use meaningful variable names
* Keep methods small and focused (max 30 lines)
* Add Javadoc for public APIs
* Use lombok annotations to reduce boilerplate
* Format code with `mvn spotless:apply` (if configured)

Example:
```java
/**
 * Retrieves an employee by ID.
 *
 * @param id the employee ID
 * @return the employee if found
 * @throws NotFoundException if employee not found
 */
public Employee getEmployeeById(Long id) {
    return employeeRepository.findById(id)
        .orElseThrow(() -> new NotFoundException("Employee not found"));
}
```

### TypeScript/Frontend

* Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* Use meaningful component and variable names
* Write functional components with hooks
* Create custom hooks for reusable logic
* Keep components small and focused
* Use proper TypeScript types (avoid `any`)

Example:
```typescript
interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

interface UseEmployeeReturn {
  employee: Employee | null;
  loading: boolean;
  error: Error | null;
}

function useEmployee(id: number): UseEmployeeReturn {
  // Implementation
}
```

### CSS/Styling

* Use Material-UI theme system
* Follow BEM naming convention for custom CSS
* Use CSS modules or styled-components
* Keep specificity low
* Mobile-first approach

---

## Commit Message Guidelines

Follow these guidelines for commit messages:

* Use the present tense ("add feature" not "added feature")
* Use the imperative mood ("move cursor to..." not "moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Format:
```
type(scope): subject

body

footer
```

Types:
* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that don't affect code meaning
* **refactor**: Code change that neither fixes a bug nor adds a feature
* **perf**: Code change that improves performance
* **test**: Adding or updating tests
* **chore**: Changes to build process or dependencies

Example:
```
feat(employee): add employee export to CSV

Add functionality to export employee list to CSV format.
Include employee name, email, and department.

Closes #123
```

---

## Testing Guidelines

### Unit Tests

* Write tests for all new functions
* Aim for 80%+ code coverage
* Use descriptive test names
* Test both success and error cases

Backend (JUnit 5):
```java
@Test
void shouldCreateEmployeeSuccessfully() {
    Employee employee = new Employee();
    employee.setEmail("test@example.com");
    
    Employee saved = employeeService.save(employee);
    
    assertNotNull(saved.getId());
    assertEquals("test@example.com", saved.getEmail());
}
```

Frontend (Vitest/Jest):
```typescript
describe("EmployeeTable", () => {
  it("should render employee list", () => {
    const employees = [{ id: 1, name: "John" }];
    render(<EmployeeTable employees={employees} />);
    
    expect(screen.getByText("John")).toBeInTheDocument();
  });
});
```

### Integration Tests

* Test complete workflows
* Test API endpoints
* Test database operations
* Use test containers for database tests

### E2E Tests

* Test critical user paths
* Use Cypress or Playwright
* Test across different browsers
* Test responsive design

---

## Documentation

When contributing, please update the documentation accordingly:

* Update README.md if you change functionality
* Add comments for complex logic
* Update API documentation (if using Swagger/OpenAPI)
* Add entry to CHANGELOG.md
* Update this CONTRIBUTING.md if you change contribution process

---

## Pull Request Process

1. **Fork the repository** and create your branch from `main`
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Make your changes** and commit them
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Create a Pull Request** with a clear title and description
6. **Link related issues**: Use "Closes #123"
7. **Ensure CI/CD passes**: All tests must pass
8. **Request review** from maintainers
9. **Address feedback** and make requested changes
10. **Merge** once approved

### Pull Request Template

```markdown
## Description
Brief description of the changes

## Type of change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Added unit tests
- [ ] Added integration tests
- [ ] Tested manually on [OS/browser]

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have updated the documentation
- [ ] I have added tests for my changes
- [ ] All new and existing tests passed
- [ ] No new warnings generated

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
```

---

## Recognition

* Contributions will be listed in the CHANGELOG
* Major contributors will be listed in README
* We appreciate all contributions!

---

## Questions?

* Open an issue with the question tag
* Check existing issues and discussions
* Contact the maintainers

---

Thank you for contributing! 🎉
