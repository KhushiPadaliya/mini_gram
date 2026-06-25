# mini_gram

## Backend Docker Setup

The backend is containerized for deployment with Docker.

### Build

From the `backend/` directory:

```bash
cd backend
docker build -t mini-gram-backend .
```

### Run locally

```bash
docker run -p 3000:3000 \
  -e PORT=3000 \
  -e DB_HOST=<your-db-host> \
  -e DB_USER=<your-db-user> \
  -e DB_PASSWORD=<your-db-password> \
  -e DB_NAME=<your-db-name> \
  -e JWT_SECRET=<your-jwt-secret> \
  mini-gram-backend
```

### AWS Deployment Notes

- Push the image to Amazon ECR.
- Use an AWS service like ECS, Fargate, or EKS.
- Do not store database credentials in Docker images; use AWS Secrets Manager or ECS task environment variables.
- Connect to a managed MySQL database such as Amazon RDS or Aurora.

### Environment variables required

- `PORT`
- `DB_HOST`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
 
