@echo off
echo Starting MERN E-commerce Application...
echo.

echo Installing dependencies...
call npm run install-all

echo.
echo Starting development servers...
echo Frontend will be available at: http://localhost:3000
echo Backend will be available at: http://localhost:5000
echo.

call npm run dev

pause
