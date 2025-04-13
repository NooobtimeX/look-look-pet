# Project Setup Guide

This guide will help you set up a project using NestJS for the backend, NextJS for the frontend, and MongoDB as your database. Docker is used for development.

## Environment Setup

- **MongoDB**: Install locally from [MongoDB Community](https://www.mongodb.com/try/download/community).
- **MongoDB Compass (Optional)**: Install for GUI management from [MongoDB Compass](https://www.mongodb.com/try/download/compass).
- **Environment Variables**: Duplicate `.env.example` to create a `.env` file in both the backend and frontend directories.

## Development

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Docker Deployment
Start docker engine

To build and run the project with Docker:
```bash
docker-compose up --build
```