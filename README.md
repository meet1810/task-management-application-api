# Task management application api

Overview

This project is a simple Task Management API built using Node.js and Express.js. It supports basic CRUD operations for users, projects, and tasks, and demonstrates relationships between these entities. The project uses an in-memory database (arrays) for simplicity.

Technologies Used

Node.js
Express.js
dotenv (for environment configuration)

Getting Started

Prerequisites

- Node.js installed on your machine
- npm (Node Package Manager)

Installation

- Clone the repository
- Run `npm install` to install dependencies
- Create a `.env` file in the root directory with referance from `env.example`
- Run `npm run dev` to start the server
- go tp ` http://localkost:PORT(set in .env)` OR ` http://localkost:PORT(set in .env)/api-docs` to see the API Endpoints Swagger

API Reference
- Base URL
    - hhttp://localkost:PORT(set in .env) 

- Endpoints
    - User Endpoints
        - Create a User
        - Endpoint: POST /users
            - Request Body:
                {
                "name": "string",
                "email": "string"
                }

        - Get All Users
        - Endpoint: GET /users
            - Query Parameters:
                - page : Page number for pagination. Default is 1.
                - limit : Number of users per page. Default is 10.
                - search : Search term to filter users.

        - Get User by ID
        - Endpoint: GET /users/{id}
            - Path Parameters:
                - id : ID of the user.

        - Update User
        - Endpoint: PUT /users/{id}
            -  Path Parameters:
                - id : ID of the user.
            - Request Body:
                {
                    "name": "string",
                    "email": "string"
                }

        - Delete User
        - Endpoint: DELETE /users/{id}
            - Path Parameters:
            - id : ID of the user.

    - Project Endpoints
        - Create a Project
        - Endpoint: POST /projects
            - Request Body:
                {
                    "name": "string",
                    "description": "string",
                    "userId": "integer"
                }

        - Get All Projects
        - Endpoint: GET /projects
            - Query Parameters:
                - page: Page number for pagination. Default is 1.
                - limit: Number of projects per page. Default is 10.
                - search : Search term to filter projects.

        - Get Project by ID
        - Endpoint: GET /projects/{id}
            - Path Parameters:
                - id : ID of the project.

        - Update Project
        - Endpoint: PUT /projects/{id}
            - Path Parameters:
            - id : ID of the project.
                - Request Body:
                    {
                        "name": "string",
                        "description": "string",
                        "userId": "integer"
                    }

        - Delete Project
        - Endpoint: DELETE /projects/{id}
            - Path Parameters:
                - id : ID of the project.

        - Get Projects by User ID
        - Endpoint: GET /user-projects/{userId}
            - Path Parameters:
            - userId : ID of the user.

    - Task Endpoints
        - Create a Task
        - Endpoint: POST /tasks
            - Request Body:
                {
                    "title": "string",
                    "description": "string",
                    "status": "string",
                    "projectId": "integer"
                }

        - Get All Tasks
        - Endpoint: GET /tasks
            - Query Parameters:
                - page: Page number for pagination. Default is 1.
                - limit: Number of tasks per page. Default is 10.
                - search : Search term to filter tasks.

        - Get Task by ID
        - Endpoint: GET /tasks/{id}
            - Path Parameters:
                - id : ID of the task.

        - Update Task
        - Endpoint: PUT /tasks/{id}
            - Path Parameters:
                - id : ID of the task.
            - Request Body:
                {
                    "title": "string",
                    "description": "string",
                    "status": "string",
                    "projectId": "integer"
                }

        - Delete Task
        - Endpoint: DELETE /tasks/{id}
            - Path Parameters:
                - id : ID of the task.

        - Get Tasks by Project ID
        - Endpoint: GET /projet-tasks/{projectId}
            - Path Parameters:
                - projectId : ID of the project.

