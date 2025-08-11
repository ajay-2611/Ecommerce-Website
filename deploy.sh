#!/bin/bash

echo "🚀 Starting deployment preparation..."

# Install all dependencies
echo "📦 Installing dependencies..."
npm run install-all

# Build the application
echo "🔨 Building application..."
npm run build:all

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🌐 Ready for deployment to Render"
    echo ""
    echo "Next steps:"
    echo "1. Push your code to GitHub"
    echo "2. Connect your repository to Render"
    echo "3. Set environment variables in Render dashboard:"
    echo "   - MONGO_URI"
    echo "   - JWT_SECRET"
    echo "   - NODE_ENV=production"
    echo "4. Deploy!"
else
    echo "❌ Build failed!"
    exit 1
fi
