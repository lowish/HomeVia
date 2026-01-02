@echo off
REM Complete testing script for Real Estate Project (Windows)

echo ============================================
echo Real Estate Project - Complete Testing Suite
echo ============================================
echo.

set PASSED=0
set FAILED=0

echo [Step 1] Checking Dependencies...
call npm list --depth=0 >nul 2>&1
if %errorlevel% equ 0 (
    echo [PASS] Dependencies OK
    set /a PASSED+=1
) else (
    echo [FAIL] Dependency issues detected
    set /a FAILED+=1
    call npm list --depth=0
)
echo.

echo [Step 2] Running ESLint...
call npm run lint
if %errorlevel% equ 0 (
    echo [PASS] Linting passed
    set /a PASSED+=1
) else (
    echo [FAIL] Linting failed
    echo Run 'npm run lint -- --fix' to auto-fix issues
    set /a FAILED+=1
)
echo.

echo [Step 3] Building Project...
call npm run build
if %errorlevel% equ 0 (
    echo [PASS] Build successful
    set /a PASSED+=1
) else (
    echo [FAIL] Build failed
    set /a FAILED+=1
    exit /b 1
)
echo.

echo [Step 4] Running Tests...
call npm test -- --watchAll=false --passWithNoTests
if %errorlevel% equ 0 (
    echo [PASS] Tests passed
    set /a PASSED+=1
) else (
    echo [FAIL] Tests failed
    set /a FAILED+=1
)
echo.

echo [Step 5] Security Audit...
call npm audit --production
if %errorlevel% equ 0 (
    echo [PASS] No vulnerabilities
    set /a PASSED+=1
) else (
    echo [WARN] Vulnerabilities found - check npm audit
    set /a FAILED+=1
)
echo.

echo [Step 6] Checking Outdated Packages...
call npm outdated
echo.

echo ============================================
echo Test Results Summary
echo ============================================
echo Passed: %PASSED%
echo Failed: %FAILED%
echo.

if %FAILED% equ 0 (
    echo All tests passed! Your project is ready.
    exit /b 0
) else (
    echo Some tests failed. Please fix the issues above.
    exit /b 1
)
