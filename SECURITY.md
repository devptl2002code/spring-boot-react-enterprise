# Security Policy

## Reporting a Vulnerability

**Please do not open a public GitHub issue to report security vulnerabilities.** This could expose the vulnerability before a fix is available.

Instead, please report security vulnerabilities via email to **security@example.com**.

### What to Include in Your Report

Please include the following details to help us understand and resolve the issue:

1. **Type of vulnerability** (e.g., SQL Injection, XSS, Authentication Bypass)
2. **Location of vulnerability** (e.g., which endpoint, component, or library)
3. **Steps to reproduce** the vulnerability
4. **Potential impact** (e.g., data exposure, unauthorized access)
5. **Proof of concept** (if available, without exposing the vulnerability publicly)
6. **Your environment** (OS, browser, Node version, Java version)

### What Happens Next

1. We will acknowledge your report within **24 hours**
2. We will confirm receipt of vulnerability details within **48 hours**
3. We will work on a fix and keep you updated on progress
4. We will aim to release a patch within **2 weeks** for critical issues
5. We will coordinate with you on disclosure timing
6. We will credit you in the security advisory (if desired)

---

## Security Best Practices for Deployment

### Production Environment

```
CRITICAL SECURITY SETTINGS:

1. Database Security
   ✅ Use PostgreSQL or MySQL (not H2)
   ✅ Enable database encryption at rest
   ✅ Use strong database passwords
   ✅ Restrict database access to backend only
   ✅ Enable backup encryption
   ✅ Use parameter-based queries (JPA handles this)

2. API Security
   ✅ Enable HTTPS/TLS (force HTTPS redirect)
   ✅ Use security headers:
      - Strict-Transport-Security
      - Content-Security-Policy
      - X-Content-Type-Options: nosniff
      - X-Frame-Options: DENY
      - X-XSS-Protection: 1; mode=block

3. Authentication
   ✅ Use strong JWT secret (minimum 256 bits)
   ✅ Implement token expiration (15-30 minutes)
   ✅ Implement refresh token rotation
   ✅ Enforce strong password policies
   ✅ Implement rate limiting on login endpoint
   ✅ Add CAPTCHA after failed login attempts

4. Environment Configuration
   ✅ Never commit secrets to git
   ✅ Use environment variables or secret management
   ✅ Use HashiCorp Vault or AWS Secrets Manager
   ✅ Rotate secrets regularly
   ✅ Use different secrets for dev/staging/prod

5. Application Security
   ✅ Enable Spring Security CSRF protection
   ✅ Implement input validation
   ✅ Use parameterized queries (JPA)
   ✅ Implement proper error handling
   ✅ Never expose stack traces in production
   ✅ Log security events
```

### Environment Variables

```bash
# Backend (.env or environment)
SPRING_DATASOURCE_URL=jdbc:postgresql://prod-db:5432/ems
SPRING_DATASOURCE_USERNAME=<secure-username>
SPRING_DATASOURCE_PASSWORD=<secure-password>
JWT_SECRET=<256-bit-random-secret>
JWT_EXPIRATION=900000
JWT_REFRESH_EXPIRATION=604800000
APP_CORS_ALLOWED_ORIGIN=https://yourdomain.com
SPRING_PROFILES_ACTIVE=prod
SERVER_SSL_KEY_STORE=<path-to-keystore>
SERVER_SSL_KEY_STORE_PASSWORD=<keystore-password>

# Frontend (.env.production)
VITE_API_URL=https://api.yourdomain.com
VITE_APP_ENV=production
```

### Dependency Security

```bash
# Backend - Check for vulnerabilities
mvn org.owasp:dependency-check-maven:check

# Frontend - Check for vulnerabilities
npm audit
npm audit fix
yarn audit
yarn audit --fix

# Use SBOM (Software Bill of Materials)
mvn cyclonedx:makeBom
npx cyclonedx-npm
```

### Regular Security Tasks

- [ ] Run dependency vulnerability scans monthly
- [ ] Update dependencies regularly
- [ ] Perform code security scanning with SonarQube
- [ ] Conduct penetration testing quarterly
- [ ] Review access logs and security events
- [ ] Rotate secrets every 6 months
- [ ] Update SSL/TLS certificates before expiry
- [ ] Keep operating systems and runtime patched

---

## Known Vulnerabilities

We will list known vulnerabilities here and their fixes:

### Version 1.0.0
- No known vulnerabilities

---

## Security Headers Configuration

### Spring Boot Configuration

```java
// Add to SecurityConfig.java

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .headers(headers -> headers
                .contentSecurityPolicy(csp -> csp
                    .policyDirectives("default-src 'self'; script-src 'self'; style-src 'self'"))
                .xssProtection(xss -> xss.and())
                .frameOptions(frameOptions -> frameOptions.deny())
                .contentTypeOptions(contentTypeOptions -> contentTypeOptions.and())
                .httpStrictTransportSecurity(hsts -> hsts
                    .includeSubDomains(true)
                    .maxAgeInSeconds(31536000)));
        
        return http.build();
    }
}
```

### Nginx Configuration (if using reverse proxy)

```nginx
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    # SSL Configuration
    ssl_certificate /path/to/certificate.crt;
    ssl_certificate_key /path/to/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Content-Security-Policy "default-src 'self'" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;
    
    location /api/auth/login {
        limit_req zone=login burst=10 nodelay;
        proxy_pass http://backend:8080;
    }

    location / {
        proxy_pass http://backend:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Docker Security Best Practices

```dockerfile
# Use specific base image version (not latest)
FROM openjdk:17.0.1-jdk-slim

# Run as non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy application
COPY --chown=appuser:appuser target/ems_backend.jar app.jar

# Switch to non-root user
USER appuser

# Don't run as root
ENTRYPOINT ["java", "-XX:+UseG1GC", "-Xmx512m", "-Xms256m", "-jar", "/app.jar"]
```

---

## OWASP Top 10 Compliance

We actively work to prevent OWASP Top 10 vulnerabilities:

1. **Broken Access Control** ✅ RBAC implemented, JwtFilter validates permissions
2. **Cryptographic Failures** ✅ HTTPS/TLS enforced, password hashing with bcrypt
3. **Injection** ✅ JPA parameterized queries, input validation
4. **Insecure Design** ✅ Security-first architecture
5. **Security Misconfiguration** ✅ Security headers configured
6. **Vulnerable & Outdated Components** ✅ Regular dependency updates
7. **Authentication Failures** ✅ JWT with expiration, rate limiting
8. **Software & Data Integrity Failures** ✅ HTTPS, signed commits
9. **Logging & Monitoring Failures** ✅ Comprehensive logging
10. **SSRF** ✅ Input validation, URL whitelisting

---

## Security Audit Checklist

Before deploying to production, verify:

- [ ] HTTPS/TLS is enabled and enforced
- [ ] Security headers are configured
- [ ] JWT secret is strong (256+ bits)
- [ ] Database password is strong
- [ ] CORS is restricted to trusted domains
- [ ] Rate limiting is implemented
- [ ] Input validation is in place
- [ ] Error handling doesn't expose sensitive info
- [ ] Logging is configured
- [ ] Backup strategy is in place
- [ ] Disaster recovery plan exists
- [ ] Security scan passes (no critical vulnerabilities)
- [ ] Dependencies are up to date
- [ ] Code review completed
- [ ] Penetration testing passed

---

## Third-Party Security Services

We recommend using these services to enhance security:

### Vulnerability Scanning
- [Snyk.io](https://snyk.io) - Continuous vulnerability scanning
- [GitHub Advanced Security](https://github.com/advanced-security) - Built-in scanning

### SIEM & Monitoring
- [Datadog](https://www.datadoghq.com) - Security Monitoring
- [Splunk](https://www.splunk.com) - Log Analytics
- [New Relic](https://newrelic.com) - Performance & Security

### WAF (Web Application Firewall)
- [Cloudflare WAF](https://www.cloudflare.com/waf/) - DDoS & Attack Protection
- [AWS WAF](https://aws.amazon.com/waf/) - AWS-native WAF

### Secret Management
- [HashiCorp Vault](https://www.vaultproject.io) - Secret Management
- [AWS Secrets Manager](https://aws.amazon.com/secrets-manager/) - AWS Secrets

---

## Contact

- **Email**: security@example.com
- **Security Team**: [security@example.com](mailto:security@example.com)
- **Response Time**: 24 hours

---

**Last Updated**: April 20, 2026
**Version**: 1.0.0
