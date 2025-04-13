# Project Setup Guide

This guide will help you set up a project using NestJS for the backend, NextJS for the frontend, and MongoDB as your database. Docker is used for development.

## Environment Setup

- **MongoDB**: Install locally from [MongoDB Community](https://www.mongodb.com/try/download/community).
- **MongoDB Compass (Optional)**: Install for GUI management from [MongoDB Compass](https://www.mongodb.com/try/download/compass).
- **Environment Variables**: Duplicate `.env.example` to create a `.env` file in both the backend and frontend directories.
- **Docker**: Install Docker from [Docker](https://www.docker.com/products/docker-desktop).
## Development

### Backend

Setup mongodb on cloud and use in .env file in backend folder.

```bash
cd backend
```

```bash
npm install
```

```bash
docker-compose up --build
```

### Frontend

```bash
cd frontend
```

```bash
npm install
```

```bash
npm run dev
```
