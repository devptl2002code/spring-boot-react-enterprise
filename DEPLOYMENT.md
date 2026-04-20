# Deployment Guide

Complete guide for deploying the Enterprise Management System (EMS) to production.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Database Setup](#database-setup)
- [Docker Deployment](#docker-deployment)
- [Kubernetes Deployment](#kubernetes-deployment)
- [Traditional Server Deployment](#traditional-server-deployment)
- [Cloud Platform Deployment](#cloud-platform-deployment)
- [Post-Deployment](#post-deployment)
- [Monitoring & Maintenance](#monitoring--maintenance)

---

## Prerequisites

### Required Tools
- Docker & Docker Compose (for containerized deployment)
- kubectl (for Kubernetes deployment)
- Git
- Node.js 18+ (for frontend builds)
- Java 17+ (for backend builds)
- Maven 3.6+ (for backend builds)

### Required Accounts
- Cloud provider account (AWS, Azure, GCP, DigitalOcean, etc.)
- Docker Registry account (DockerHub, GitHub Container Registry, etc.)
- SSL/TLS certificate provider (Let's Encrypt, DigiCert, etc.)

---

## Pre-Deployment Checklist

### Security Review
- [ ] All dependencies are up to date
- [ ] No critical vulnerabilities in dependencies
- [ ] Security headers configured
- [ ] HTTPS/TLS enforced
- [ ] Environment variables configured
- [ ] JWT secret changed to strong value
- [ ] Database password is strong
- [ ] CORS restricted to trusted domains

### Code Review
- [ ] Code review completed
- [ ] Tests pass (80%+ coverage)
- [ ] No console.log() in production code
- [ ] No hardcoded secrets
- [ ] Error handling implemented
- [ ] Logging configured

### Infrastructure Review
- [ ] Database backups configured
- [ ] Monitoring & alerting configured
- [ ] Load balancing configured
- [ ] Auto-scaling policies set
- [ ] Disaster recovery plan in place
- [ ] Runbooks created

---

## Database Setup

### PostgreSQL on Ubuntu

```bash
# Install PostgreSQL
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Create database and user
sudo -u postgres psql << EOF
CREATE DATABASE ems_production;
CREATE USER ems_user WITH PASSWORD 'strong_password_here';
ALTER ROLE ems_user SET client_encoding TO 'utf8';
ALTER ROLE ems_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ems_user SET default_transaction_deferrable TO on;
ALTER ROLE ems_user SET default_transaction_isolation TO 'read committed';
GRANT ALL PRIVILEGES ON DATABASE ems_production TO ems_user;
EOF

# Configure PostgreSQL for remote connections (optional)
sudo sed -i "s/#listen_addresses = 'localhost'/listen_addresses = '*'/g" /etc/postgresql/*/main/postgresql.conf
echo "host    all             all             0.0.0.0/0               md5" >> /etc/postgresql/*/main/pg_hba.conf
sudo systemctl restart postgresql
```

### PostgreSQL Backup Strategy

```bash
#!/bin/bash
# backup.sh - Run daily via cron

BACKUP_DIR="/var/backups/ems_postgres"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/ems_$DATE.sql.gz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Create backup
pg_dump -U ems_user -h localhost ems_production | gzip > $BACKUP_FILE

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

# Upload to S3 (optional)
aws s3 cp $BACKUP_FILE s3://ems-backups/

echo "Backup completed: $BACKUP_FILE"
```

Add to crontab:
```bash
# Daily backup at 2 AM
0 2 * * * /home/deploy/backup.sh
```

---

## Docker Deployment

### Build Docker Images

#### Backend Dockerfile

```dockerfile
# Stage 1: Build
FROM maven:3.8-openjdk-17 AS builder
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Stage 2: Runtime
FROM openjdk:17-jdk-slim
WORKDIR /app

# Create non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser

# Copy JAR from builder
COPY --from=builder /app/target/ems_backend-0.0.1-SNAPSHOT.jar app.jar

# Set ownership
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD java -cp app.jar org.springframework.boot.loader.JarLauncher -c "/health"

# Run application
ENTRYPOINT ["java", "-XX:+UseG1GC", "-Xmx512m", "-Xms256m", "-jar", "/app/app.jar"]
```

#### Frontend Dockerfile

```dockerfile
# Stage 1: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime (Nginx)
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost/health || exit 1

CMD ["nginx", "-g", "daemon off;"]
```

### Deploy with Docker Compose

```bash
# Clone repository
git clone https://github.com/yourusername/ems.git
cd ems

# Copy example files
cp ems_backend/.env.production.example ems_backend/.env.production
cp ems_frontend/.env.production.example ems_frontend/.env.production

# Edit environment files with production values
nano ems_backend/.env.production
nano ems_frontend/.env.production

# Build images
docker-compose -f docker-compose.yml.example build

# Start services
docker-compose -f docker-compose.yml.example up -d

# Verify services
docker-compose logs -f

# Stop services (when needed)
docker-compose down
```

---

## Kubernetes Deployment

### Prerequisites
- Kubernetes cluster (1.24+)
- kubectl configured
- Helm (optional)

### Create Kubernetes Manifests

```bash
# Create namespace
kubectl create namespace ems

# Create ConfigMap for configuration
kubectl create configmap ems-config \
  --from-literal=SPRING_PROFILES_ACTIVE=prod \
  --from-literal=VITE_API_URL=https://api.example.com \
  -n ems

# Create Secret for sensitive data
kubectl create secret generic ems-secrets \
  --from-literal=JWT_SECRET=$(openssl rand -base64 32) \
  --from-literal=SPRING_DATASOURCE_PASSWORD=your_db_password \
  -n ems
```

### Deployment Manifest (backend-deployment.yaml)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ems-backend
  namespace: ems
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ems-backend
  template:
    metadata:
      labels:
        app: ems-backend
    spec:
      containers:
      - name: ems-backend
        image: your-registry/ems-backend:1.0.0
        ports:
        - containerPort: 8080
        envFrom:
        - configMapRef:
            name: ems-config
        - secretRef:
            name: ems-secrets
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: ems-backend-service
  namespace: ems
spec:
  type: ClusterIP
  selector:
    app: ems-backend
  ports:
  - protocol: TCP
    port: 8080
    targetPort: 8080
---
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ems-backend-hpa
  namespace: ems
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ems-backend
  minReplicas: 2
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
```

### Deploy to Kubernetes

```bash
# Apply manifests
kubectl apply -f backend-deployment.yaml
kubectl apply -f frontend-deployment.yaml
kubectl apply -f ingress.yaml

# Monitor deployment
kubectl get deployments -n ems
kubectl get pods -n ems
kubectl get services -n ems

# Check logs
kubectl logs -f deployment/ems-backend -n ems
```

---

## Traditional Server Deployment

### Ubuntu/Debian Server

```bash
# 1. Update system
sudo apt-get update && sudo apt-get upgrade -y

# 2. Install Java
sudo apt-get install -y openjdk-17-jdk

# 3. Create application user
sudo useradd -m -s /bin/bash ems_app
sudo mkdir -p /opt/ems
sudo chown -R ems_app:ems_app /opt/ems

# 4. Copy application JAR
sudo cp ems_backend-0.0.1-SNAPSHOT.jar /opt/ems/app.jar
sudo chown ems_app:ems_app /opt/ems/app.jar

# 5. Create systemd service file
sudo tee /etc/systemd/system/ems.service > /dev/null <<EOF
[Unit]
Description=Enterprise Management System
After=network.target

[Service]
Type=simple
User=ems_app
WorkingDirectory=/opt/ems
EnvironmentFile=/etc/ems/ems.env
ExecStart=/usr/bin/java -XX:+UseG1GC -Xmx512m -Xms256m -jar /opt/ems/app.jar
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
EOF

# 6. Create environment file
sudo mkdir -p /etc/ems
sudo tee /etc/ems/ems.env > /dev/null <<EOF
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ems_production
SPRING_DATASOURCE_USERNAME=ems_user
SPRING_DATASOURCE_PASSWORD=your_db_password
JWT_SECRET=$(openssl rand -base64 32)
SPRING_PROFILES_ACTIVE=prod
EOF

# 7. Enable and start service
sudo systemctl daemon-reload
sudo systemctl enable ems
sudo systemctl start ems

# 8. Check status
sudo systemctl status ems
```

### Nginx Reverse Proxy Configuration

```nginx
upstream ems_backend {
    server localhost:8080;
}

server {
    listen 80;
    server_name api.example.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/api.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.example.com/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "DENY" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=100r/s;
    limit_req_zone $binary_remote_addr zone=login:10m rate=5r/m;

    location ~ ^/api/auth/login {
        limit_req zone=login burst=10;
        proxy_pass http://ems_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location ~ ^/api {
        limit_req zone=api_limit burst=20;
        proxy_pass http://ems_backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Cloud Platform Deployment

### AWS Deployment with Elastic Beanstalk

```bash
# 1. Install EB CLI
pip install awsebcli

# 2. Initialize EB application
eb init -p java-17 ems-app

# 3. Create environment
eb create ems-prod-env \
  --instance-type t3.medium \
  --scale 3 \
  --database \
  --database.engine postgres \
  --database.version 15

# 4. Set environment variables
eb setenv \
  SPRING_PROFILES_ACTIVE=prod \
  JWT_SECRET=$(openssl rand -base64 32)

# 5. Deploy application
eb deploy
```

### Google Cloud Platform (GCP) with Cloud Run

```bash
# 1. Authenticate with GCP
gcloud auth login

# 2. Build Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT/ems-backend

# 3. Deploy to Cloud Run
gcloud run deploy ems-backend \
  --image gcr.io/YOUR_PROJECT/ems-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars SPRING_PROFILES_ACTIVE=prod
```

### Azure App Service

```bash
# 1. Create resource group
az group create --name ems-rg --location eastus

# 2. Create App Service Plan
az appservice plan create \
  --name ems-plan \
  --resource-group ems-rg \
  --sku B2 \
  --is-linux

# 3. Deploy container
az webapp create \
  --resource-group ems-rg \
  --plan ems-plan \
  --name ems-backend \
  --deployment-container-image-name yourregistry.azurecr.io/ems-backend:1.0.0
```

---

## Post-Deployment

### Verify Deployment

```bash
# Test health endpoint
curl -k https://api.example.com/actuator/health

# Test API endpoint
curl -k -X GET https://api.example.com/api/employees \
  -H "Authorization: Bearer your_jwt_token"

# Check logs
tail -f /var/log/ems/app.log
```

### SSL/TLS Certificate Setup

```bash
# Install Certbot
sudo apt-get install -y certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d api.example.com -d www.example.com

# Auto-renewal
sudo certbot renew --dry-run
```

### Configure Firewall

```bash
# UFW (Ubuntu Firewall)
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

---

## Monitoring & Maintenance

### Monitoring Setup

```bash
# Install Prometheus exporter
# Configure Spring Boot Actuator
# Set up Grafana dashboards
# Configure AlertManager alerts
```

### Regular Maintenance Tasks

- [ ] Daily: Check application logs
- [ ] Weekly: Review performance metrics
- [ ] Weekly: Check for security updates
- [ ] Monthly: Database optimization
- [ ] Monthly: Review backups
- [ ] Quarterly: Security audit
- [ ] Quarterly: Performance optimization

### Backup & Recovery

```bash
# Daily database backup
0 2 * * * /home/deploy/backup.sh

# Test restore
pg_restore -U ems_user -d ems_test < backup.sql
```

---

## Rollback Procedure

```bash
# If deployment fails:
# 1. Docker Compose
docker-compose pull
docker-compose up -d

# 2. Kubernetes
kubectl rollout undo deployment/ems-backend -n ems

# 3. Traditional
systemctl restart ems
# Or revert code changes and rebuild JAR
```

---

## Support & Troubleshooting

- Check application logs: `journalctl -u ems -f`
- Check database: `psql -U ems_user -d ems_production`
- Check service status: `systemctl status ems`
- Review SECURITY.md for security issues
- Check SECURITY.md for common problems

---

**Last Updated**: April 20, 2026
**Version**: 1.0.0
