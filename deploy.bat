@echo off
echo 🚀 Starting deployment preparation...

echo 📦 Installing dependencies...
call npm run install-all

echo 🔨 Building application...
call npm run build:all

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build successful!
    echo 🌐 Ready for deployment to Render
    echo.
    echo Next steps:
    echo 1. Push your code to GitHub
    echo 2. Connect your repository to Render
    echo 3. Set environment variables in Render dashboard:
    echo    - MONGO_URI
    echo    - JWT_SECRET
    echo    - NODE_ENV=production
    echo 4. Deploy!
) else (
    echo ❌ Build failed!
    pause
    exit /b 1
)

pause
