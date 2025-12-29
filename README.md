# Professional City Management REST API

A production-ready, clean-architecture REST API built with Express.js for managing a collection of cities with in-memory storage. This project demonstrates high-quality software engineering practices, including validation, testing, and comprehensive documentation.

## 🚀 Key Features

-   **Clean Architecture**: Structured with a clear separation of concerns (Routes, Controllers, Services, Models).
-   **JWT Authentication**: Secure login endpoint providing JSON Web Tokens.
-   **Role-Based Access Control (RBAC)**: Protected write operations (POST, PUT, DELETE) restricted to 'admin' role.
-   **CI/CD Pipeline**: Integrated GitHub Actions for automated testing on every push and pull request.
-   **Robust Validation**: Integrated `Zod` for schema-based request validation.
-   **Interactive Documentation**: Automated API documentation using Swagger UI.
-   **Automated Testing**: Integration tests powered by `Jest` and `Supertest`.
-   **Security**: Minimal security setup with `Helmet` and `CORS`.
-   **Structured Logging**: Request logging using `Morgan`.
-   **Global Error Handling**: Centralized error middleware for consistent response formats.

## 🛠️ Tech Stack

-   **Runtime**: Node.js
-   **Framework**: Express.js
-   **Validation**: Zod
-   **API Documentation**: Swagger/OpenAPI
-   **Testing**: Jest, Supertest
-   **Utilities**: UUID, Helmet, CORS, Morgan

## 📁 Project Structure

```text
src/
├── config/             # Configuration files (Swagger, etc.)
├── controllers/        # Request handlers
├── middlewares/        # Custom middleware (Error, Validation)
├── models/             # Data access layer (In-memory)
├── routes/             # API route definitions
├── schemas/            # Zod validation schemas
├── services/           # Business logic
├── app.js              # Express app setup
└── server.js           # Entry point
tests/                  # Automated integration tests
```

## 🚥 Getting Started

### Prerequisites

-   Node.js (v14+)
-   npm

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    cd expres
    ```
2. Install dependencies:
    ```bash
    npm install
    ```

### Running the Application

- **Development Mode** (with auto-reload):
    ```bash
    npm run dev
    ```
- **Production Mode**:
    ```bash
    npm start
    ```

The API will be available at `http://localhost:3000`.

## � Authentication & Mock Credentials

This API uses JWT Bearer Token authentication. Some endpoints (POST, PUT, DELETE) require an `admin` role.

**Mock Admin User:**
- **Email:** `admin@example.com`
- **Password:** `adminpassword`

To use protected routes:
1. POST to `/api/v1/auth/login` with the credentials above.
2. Copy the `token` from the response.
3. Add the header: `Authorization: Bearer <your-token>`.

## �📚 API Documentation

Once the server is running, you can access the interactive Swagger UI documentation at:
👉 **[http://localhost:3000/api-docs](http://localhost:3000/api-docs)**

### Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/v1/cities` | List all cities |
| `GET` | `/api/v1/cities/:id` | Get city details by ID |
| `POST` | `/api/v1/cities` | Create a new city |
| `PUT` | `/api/v1/cities/:id` | Update an existing city |
| `DELETE` | `/api/v1/cities/:id` | Remove a city |

## 🧪 Testing

Run the automated test suite:
```bash
npm test
```

## 📄 License

This project is licensed under the MIT License.
