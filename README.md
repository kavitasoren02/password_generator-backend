# Password Vault Backend

Backend API for the Password Vault application built with Express.js, MongoDB, and TypeScript.

## Features

- User authentication (register/login)
- JWT-based authorization
- Vault item CRUD operations
- Search and pagination
- Encrypted password storage

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file:
```bash
cp .env
```

3. Update the `.env` file with your MongoDB URI and JWT secret.

4. Run the development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Vault Items (Protected)
- `POST /api/vault` - Create a new vault item
- `GET /api/vault` - Get all vault items (with pagination and search)
- `GET /api/vault/:id` - Get a single vault item
- `PUT /api/vault/:id` - Update a vault item
- `DELETE /api/vault/:id` - Delete a vault item

## Environment Variables

- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `NODE_ENV` - Environment (development/production)
