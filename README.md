# Expense Tracker & Tax Filing Assistant Backend

Backend service for the Expense Tracker & Tax Filing Assistant application.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:** User object with JWT token

#### Login
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```
- **Response:** User object with JWT token

#### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** User object

### Expense Endpoints

All expense endpoints require authentication header: `Authorization: Bearer <token>`

#### Create Expense
- **POST** `/api/expenses`
- **Body:**
  ```json
  {
    "description": "string",
    "amount": "number",
    "category": "string",
    "date": "date",
    "taxDeductible": "boolean",
    "notes": "string"
  }
  ```

#### Upload Receipt
- **POST** `/api/expenses/:expenseId/receipt`
- **Content-Type:** `multipart/form-data`
- **Body:** Form data with 'receipt' file

#### Get Expenses
- **GET** `/api/expenses`
- **Query Parameters:**
  - `startDate`: Filter by start date
  - `endDate`: Filter by end date
  - `category`: Filter by category

#### Get Single Expense
- **GET** `/api/expenses/:id`

#### Update Expense
- **PUT** `/api/expenses/:id`
- **Body:** Same as create expense

#### Delete Expense
- **DELETE** `/api/expenses/:id`

## Frontend Integration

1. Set CORS_ORIGIN in backend .env to your React app URL
2. Use fetch or axios to make API calls from React
3. Store JWT token in localStorage/sessionStorage
4. Include token in Authorization header for all authenticated requests

Example React API call:
```javascript
// Login example
const login = async (username, password) => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password })
  });
  const data = await response.json();
  // Store token
  localStorage.setItem('token', data.token);
  return data;
};

// Authenticated request example
const getExpenses = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3001/api/expenses', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
};
```

## Error Handling

All endpoints follow this error response format:
```json
{
  "error": {
    "message": "Error description",
    "details": "Additional error details (in development)"
  }
}
```

Common HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Server Error
