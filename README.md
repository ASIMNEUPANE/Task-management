# Task Management Application

## Overview

The Task Management Application is a comprehensive web platform that enables users to create, manage, and track their tasks efficiently. Users can input task details, and the application will send email reminders as due dates approach. Built with a modern tech stack, this application ensures a smooth user experience and robust backend functionalities.

## Features

- **User Management**: Secure user registration and login with JWT-based authentication using access and refresh tokens.
- **Task Creation & Management**: Users can create tasks with details like title, description, attachment, and due date.
- **Due Date Reminders**: Automatic email notifications sent to users when their task due dates approach.
- **State Management**: Utilizes Zustand for efficient state management in the frontend.
- **Data Fetching**: Implements TanStack Query for seamless data retrieval.
- **Unit Testing**: Comprehensive unit testing is conducted using Jest with mocking to ensure code reliability.
- **API Documentation**: Swagger is used for detailed API documentation.
- **Code Quality Tools**: Prettier and ESLint for code formatting and linting.
- **Pre-commit Hooks**: Husky is used to enforce quality checks before commits.
- **Database Management**: Prisma ORM is utilized for database interactions, with PostgreSQL as the database solution.
- **Docker Support**: The application is containerized with Docker, making it easy to run and deploy.

## Technologies Used

- **Frontend**: Next.js
- **State Management**: Zustand
- **Data Fetching**: TanStack Query
- **Backend**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Testing**: Jest
- **API Documentation**: Swagger
- **Code Quality**: Prettier, ESLint
- **Pre-commit Hooks**: Husky
- **Containerization**: Docker

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:ASIMNEUPANE/Task-management.git
    ```