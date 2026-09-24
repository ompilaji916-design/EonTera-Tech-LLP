@echo off
setlocal
node --version
if errorlevel 1 goto :nodefail
call npm ci
if errorlevel 1 goto :fail
call npm run typecheck
if errorlevel 1 goto :fail
call npm test
if errorlevel 1 goto :fail
call npm run build
if errorlevel 1 goto :fail
call npm run check:export
if errorlevel 1 goto :fail
echo.
echo BUILD COMPLETE. Deploy the contents of the out folder.
exit /b 0
:nodefail
echo Node.js is not available. Install a version supported by package.json first.
exit /b 1
:fail
echo.
echo Build or verification failed. Review the error above.
exit /b 1
