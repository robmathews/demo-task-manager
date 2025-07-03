# Demo Task Manager

A simple task management application for testing CI/CD workflows with GregBot.

## Architecture

- **Frontend**: React TypeScript app
- **Backend**: Node.js Express API
- **Database**: SQLite (for simplicity)
- **Containers**: Docker for both services

## Local Development

```bash
# Install dependencies
cd backend && npm install && cd ..
cd frontend && npm install && cd ..

# Run backend
cd backend && npm run dev

# Run frontend (in another terminal)
cd frontend && npm start
