# roqqu-user-management-system

## Overview

The objective of this project is to build a user management system that enables users to perform CRUD operations on posts and addresses. The application will demonstrate core backend development skills, including database interaction, and RESTful API design. The project will utilize Node.js and SQLite Database to meet the requirements.

## Design Choices

- **Controller-Service-Repository Pattern:**  
  The application is organized into controllers (handling HTTP requests), services (containing business logic), and repositories (managed by SQLite). This separation improves maintainability, testability, and scalability.

## Setup and Installation

1. **Clone the Repository:**

   ```bash
   git clone <repository-url>
   cd roqqu-user-management-system
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run Database Migrations:**
   ```bash
   npm run migrate:run
   ```

## Running the Application

1. **Development Mode:**

   ```bash
   npm run start:dev
   ```

2. **Production Build:**

   ```bash
   npm run build
   ```

   ```bash
   npm start
   ```

## Testing

1. **Run All Tests:**

   ```bash
   npm run test
   ```

## API Documentation
