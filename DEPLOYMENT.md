# Deployment Guide

Complete guide for deploying the Image Format Converter application.

## Table of Contents
1. [Git Setup](#git-setup)
2. [Docker Deployment](#docker-deployment)
3. [Production Recommendations](#production-recommendations)
4. [Cloud Deployment Options](#cloud-deployment-options)
5. [Monitoring & Maintenance](#monitoring--maintenance)

---

## Git Setup

### Initial Repository Setup

1. **Initialize Git repository** (if not already done):
```bash
git init
```

2. **Add all files**:
```bash
git add .
```

3. **Create initial commit**:
```bash
git commit -m "Initial commit: Image Format Converter application"
```

4. **Add remote repository**:
```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

### Recommended Branch Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - Feature branches
- `hotfix/*` - Emergency fixes

---

## Docker Deployment

### Local Testing

1. **Build the Docker image**:
```bash
docker build -t image-converter:latest .
```

2. **Test the container locally**:
```bash
docker run -d -p 5000:5000 --name image-converter-test image-converter:latest
```

3. **Verify it's running**:
```bash
curl http://localhost:5000/api/health
# Expected: {"status":"ok","timestamp":"..."}
```

4. **Check logs**:
```bash
docker logs image-converter-test
```

5. **Stop and remove**:
```bash
docker stop image-converter-test
docker rm image-converter-test
```

### Using Docker Compose (Recommended)

1. **Start the application**:
```bash
docker-compose up -d
```

2. **View logs**:
```bash
docker-compose logs -f
```

3. **Stop the application**:
```bash
docker-compose down
```

4. **Rebuild after changes**:
```bash
docker-compose up -d --build
```

---

## Production Recommendations

### 1. Security Best Practices

#### Reverse Proxy with NGINX
Use NGINX as a reverse proxy for SSL/TLS termination:

```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

#### Security Headers
Add these to NGINX configuration:
```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;
```

### 2. Resource Optimization

#### Image Size Optimization
The Docker image is already optimized with multi-stage builds:
- Build stage: ~1.2GB
- Production image: ~150MB

#### Compression
Enable gzip compression in NGINX:
```nginx
gzip on;
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss;
```

### 3. Performance Tuning

#### Docker Resource Limits
Add to `docker-compose.yml`:
```yaml
services:
  image-converter:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

#### Node.js Optimization
Set environment variables:
```yaml
environment:
  - NODE_ENV=production
  - NODE_OPTIONS=--max-old-space-size=384
```

### 4. Logging

#### Docker Logging Driver
Add to `docker-compose.yml`:
```yaml
services:
  image-converter:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

#### Application Logs
Consider adding structured logging:
```bash
npm install winston
```

### 5. Backup Strategy

Since this is a stateless application (no database), focus on:
- Version control (Git)
- Docker image versioning
- Configuration backups

---

## Cloud Deployment Options

### Option 1: AWS EC2

1. **Launch EC2 instance** (t3.micro or larger)
2. **Install Docker**:
```bash
sudo yum update -y
sudo yum install -y docker
sudo service docker start
sudo usermod -a -G docker ec2-user
```

3. **Deploy application**:
```bash
git clone <your-repo>
cd image-converter
docker-compose up -d
```

4. **Configure Security Group**: Allow inbound traffic on port 80/443

### Option 2: AWS ECS (Elastic Container Service)

1. **Push image to ECR**:
```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com
docker tag image-converter:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/image-converter:latest
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/image-converter:latest
```

2. **Create ECS Task Definition** with the pushed image
3. **Create ECS Service** and deploy

### Option 3: DigitalOcean App Platform

1. **Connect GitHub repository**
2. **Configure build settings**:
   - Build command: `npm run build`
   - Run command: `npm start`
3. **Deploy** (automatic builds on git push)

### Option 4: Railway.app

1. **Connect GitHub repository**
2. **Railway auto-detects Dockerfile**
3. **Deploy** (zero configuration needed)

### Option 5: Render.com

1. **Connect GitHub repository**
2. **Select "Docker" as environment**
3. **Deploy** (Render uses your Dockerfile)

### Option 6: Google Cloud Run

```bash
gcloud builds submit --tag gcr.io/PROJECT-ID/image-converter
gcloud run deploy --image gcr.io/PROJECT-ID/image-converter --platform managed
```

### Option 7: Azure Container Instances

```bash
az acr build --registry <registry-name> --image image-converter:latest .
az container create --resource-group myResourceGroup --name image-converter \
  --image <registry-name>.azurecr.io/image-converter:latest \
  --dns-name-label image-converter --ports 5000
```

---

## Monitoring & Maintenance

### Health Checks

The application includes a health check endpoint:
```bash
curl http://your-domain.com/api/health
```

### Monitoring Tools

#### Free Options:
- **UptimeRobot**: Monitor uptime and response time
- **New Relic Free Tier**: Application performance monitoring
- **Sentry**: Error tracking

#### Paid Options:
- **Datadog**: Full-stack monitoring
- **Prometheus + Grafana**: Metrics and dashboards

### Update Strategy

1. **Test updates locally**:
```bash
git pull
docker-compose build
docker-compose up -d
```

2. **Blue-Green Deployment** (for zero downtime):
```bash
# Start new version on different port
docker run -d -p 5001:5000 --name image-converter-blue image-converter:new

# Test new version
curl http://localhost:5001/api/health

# Update reverse proxy to point to new version
# Stop old version
docker stop image-converter-green
```

### Backup Checklist

- ✅ Code backed up in Git
- ✅ Docker images tagged with version numbers
- ✅ NGINX configuration files backed up
- ✅ SSL certificates backed up
- ✅ Environment variables documented

---

## Recommended Production Stack

```
Internet
    ↓
Cloudflare (CDN + DDoS Protection)
    ↓
NGINX (Reverse Proxy + SSL)
    ↓
Docker Container (Node.js + Express)
    ↓
Static Files (React SPA)
```

### Estimated Costs

#### Minimal Setup (Hobby/Personal):
- **DigitalOcean Droplet**: $6/month
- **Domain**: $12/year
- **SSL**: Free (Let's Encrypt)
- **Total**: ~$7/month

#### Production Setup:
- **AWS t3.small**: $15/month
- **CloudFront CDN**: $5-20/month
- **Route 53**: $1/month
- **SSL**: Free (AWS Certificate Manager)
- **Total**: ~$21-36/month

---

## Quick Reference Commands

### Docker
```bash
# Build
docker build -t image-converter .

# Run
docker run -d -p 5000:5000 image-converter

# Logs
docker logs -f <container-id>

# Shell access
docker exec -it <container-id> sh

# Clean up
docker system prune -a
```

### Docker Compose
```bash
# Start
docker-compose up -d

# Stop
docker-compose down

# Rebuild
docker-compose up -d --build

# Logs
docker-compose logs -f

# Scale (if needed)
docker-compose up -d --scale image-converter=3
```

### Git
```bash
# Tag release
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# Create branch
git checkout -b feature/new-feature

# Merge to main
git checkout main
git merge feature/new-feature
```

---

## Troubleshooting

### Container won't start
```bash
docker logs <container-id>
docker inspect <container-id>
```

### Port already in use
```bash
sudo lsof -i :5000
sudo kill -9 <PID>
```

### Build fails
```bash
docker build --no-cache -t image-converter .
```

### Health check failing
```bash
docker exec -it <container-id> wget -O- http://localhost:5000/api/health
```

---

## Support

For issues and questions:
1. Check application logs
2. Review health check endpoint
3. Verify Docker container status
4. Check reverse proxy configuration (if applicable)
