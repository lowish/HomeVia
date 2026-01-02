#!/bin/bash
# Complete testing script for Real Estate Project

echo "🏠 Real Estate Project - Complete Testing Suite"
echo "================================================"
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

echo "📋 Step 1: Checking Dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    echo -e "${GREEN}✓ Dependencies OK${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ Dependency issues detected${NC}"
    ((FAILED++))
    npm list --depth=0
fi
echo ""

echo "🔍 Step 2: Running ESLint..."
if npm run lint; then
    echo -e "${GREEN}✓ Linting passed${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ Linting failed${NC}"
    echo "Run 'npm run lint -- --fix' to auto-fix issues"
    ((FAILED++))
fi
echo ""

echo "🔨 Step 3: Building Project..."
if npm run build; then
    echo -e "${GREEN}✓ Build successful${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ Build failed${NC}"
    ((FAILED++))
    exit 1
fi
echo ""

echo "🧪 Step 4: Running Tests..."
if npm test -- --watchAll=false --passWithNoTests; then
    echo -e "${GREEN}✓ Tests passed${NC}"
    ((PASSED++))
else
    echo -e "${RED}✗ Tests failed${NC}"
    ((FAILED++))
fi
echo ""

echo "🔒 Step 5: Security Audit..."
if npm audit --production; then
    echo -e "${GREEN}✓ No vulnerabilities${NC}"
    ((PASSED++))
else
    echo -e "${YELLOW}⚠ Vulnerabilities found - check npm audit${NC}"
    ((FAILED++))
fi
echo ""

echo "📊 Step 6: Checking Outdated Packages..."
npm outdated || echo -e "${YELLOW}⚠ Some packages are outdated${NC}"
echo ""

echo "================================================"
echo "📈 Test Results Summary"
echo "================================================"
echo -e "Passed: ${GREEN}${PASSED}${NC}"
echo -e "Failed: ${RED}${FAILED}${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! Your project is ready.${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please fix the issues above.${NC}"
    exit 1
fi
