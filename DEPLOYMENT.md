# Deployment Guide

## Structure
This is a monorepo with separate frontend and backend directories. Each has its own package.json and package-lock.json.

## Workflow
The deployment workflow:
1. Installs dependencies for both frontend and backend
2. Builds both applications
3. Deploys to EC2 in the default VPC

## Required Secrets
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY
- EC2_INSTANCE_ID

## Troubleshooting
If you see npm ci errors, check that you're in the correct directory. The workflow uses working-directory to ensure commands run in the right location.
