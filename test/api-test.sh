#!/bin/bash

# Base URL
API_URL="http://localhost:3001/api"
TOKEN=""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "🚀 Testing Express Backend API"
echo "----------------------------"

# 1. Register a new user
echo -e "\n${GREEN}1. Testing User Registration${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }')
echo "Register Response: $REGISTER_RESPONSE"

# 2. Login
echo -e "\n${GREEN}2. Testing User Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "password123"
  }')
echo "Login Response: $LOGIN_RESPONSE"

# Extract token from login response
TOKEN=$(echo $LOGIN_RESPONSE | grep -o '"token":"[^"]*' | cut -d'"' -f4)
echo "Token: $TOKEN"

if [ -z "$TOKEN" ]; then
  echo -e "${RED}Failed to get token. Exiting.${NC}"
  exit 1
fi

# 3. Create an expense
echo -e "\n${GREEN}3. Testing Expense Creation${NC}"
EXPENSE_RESPONSE=$(curl -s -X POST "$API_URL/expenses" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Office Supplies",
    "amount": 150.00,
    "category": "office",
    "taxDeductible": true,
    "notes": "Bought printer paper and ink"
  }')
echo "Create Expense Response: $EXPENSE_RESPONSE"

# Extract expense ID
EXPENSE_ID=$(echo $EXPENSE_RESPONSE | grep -o '"_id":"[^"]*' | cut -d'"' -f4)
echo "Expense ID: $EXPENSE_ID"

if [ -z "$EXPENSE_ID" ]; then
  echo -e "${RED}Failed to get expense ID. Exiting.${NC}"
  exit 1
fi

# 4. Upload a receipt
echo -e "\n${GREEN}4. Testing Receipt Upload${NC}"
echo "Test Receipt Content" > test-receipt.txt
UPLOAD_RESPONSE=$(curl -s -X POST "$API_URL/expenses/$EXPENSE_ID/receipt" \
  -H "Authorization: Bearer $TOKEN" \
  -F "receipt=@test-receipt.txt")
echo "Upload Receipt Response: $UPLOAD_RESPONSE"
rm test-receipt.txt

# 5. Get all expenses
echo -e "\n${GREEN}5. Testing Get All Expenses${NC}"
EXPENSES_RESPONSE=$(curl -s -X GET "$API_URL/expenses" \
  -H "Authorization: Bearer $TOKEN")
echo "Get Expenses Response: $EXPENSES_RESPONSE"

# 6. Get specific expense
echo -e "\n${GREEN}6. Testing Get Specific Expense${NC}"
EXPENSE_DETAIL_RESPONSE=$(curl -s -X GET "$API_URL/expenses/$EXPENSE_ID" \
  -H "Authorization: Bearer $TOKEN")
echo "Get Expense Detail Response: $EXPENSE_DETAIL_RESPONSE"

# 7. Update expense
echo -e "\n${GREEN}7. Testing Update Expense${NC}"
UPDATE_RESPONSE=$(curl -s -X PUT "$API_URL/expenses/$EXPENSE_ID" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Updated Office Supplies",
    "amount": 200.00,
    "category": "office",
    "taxDeductible": true,
    "notes": "Updated description"
  }')
echo "Update Response: $UPDATE_RESPONSE"

# 8. Delete expense
echo -e "\n${GREEN}8. Testing Delete Expense${NC}"
DELETE_RESPONSE=$(curl -s -X DELETE "$API_URL/expenses/$EXPENSE_ID" \
  -H "Authorization: Bearer $TOKEN")
echo "Delete Response: $DELETE_RESPONSE"

echo -e "\n${GREEN}✅ API Test Complete${NC}"
