#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

BASE_URL="http://localhost:3000"

echo -e "${GREEN}Testing Routes Accessibility${NC}"
echo "------------------------"

# Function to test a route
test_route() {
    local route=$1
    local name=$2
    response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL$route)
    
    if [ $response -eq 200 ]; then
        echo -e "${GREEN}✓${NC} $name ($route) - Accessible"
    else
        echo -e "${RED}✗${NC} $name ($route) - Error $response"
    fi
}

# Test all routes
test_route "/" "Landing Page"
test_route "/dashboard" "Dashboard"
test_route "/upload" "Upload"
test_route "/categorize" "Categorize"
test_route "/summary" "Summary"

# Test static file
echo -e "\n${GREEN}Testing Static Files${NC}"
echo "------------------------"
response=$(curl -s -o /dev/null -w "%{http_code}" $BASE_URL/reports/tax-report.txt)
if [ $response -eq 200 ]; then
    echo -e "${GREEN}✓${NC} Tax Report File - Accessible"
else
    echo -e "${RED}✗${NC} Tax Report File - Error $response"
fi

echo -e "\n${GREEN}Test Complete${NC}"
