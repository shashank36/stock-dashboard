#!/bin/bash

# 🚀 Stock Dashboard Deployment Script
# This script helps you prepare and deploy your stock dashboard

echo "🚀 Stock Dashboard Deployment Script"
echo "====================================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first."
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "backend/package.json" ] || [ ! -f "frontend/package.json" ]; then
    echo "❌ Please run this script from the stock-dashboard directory"
    exit 1
fi

echo "📋 Prerequisites check..."
echo "✅ Git is installed"
echo "✅ In correct directory"

# Initialize git repository if not already done
if [ ! -d ".git" ]; then
    echo "🔧 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Stock Dashboard with backend and frontend"
    echo "✅ Git repository initialized"
else
    echo "✅ Git repository already exists"
fi

echo ""
echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. Create a GitHub repository:"
echo "   - Go to https://github.com"
echo "   - Click 'New repository'"
echo "   - Name it: stock-dashboard"
echo "   - Make it PUBLIC (required for free deployment)"
echo "   - Don't initialize with README"
echo ""
echo "2. Push to GitHub:"
echo "   git remote add origin https://github.com/YOUR_USERNAME/stock-dashboard.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "3. Deploy Backend to Render:"
echo "   - Go to https://render.com"
echo "   - Sign up with GitHub"
echo "   - Create new Web Service"
echo "   - Connect your repository"
echo "   - Root Directory: backend"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo ""
echo "4. Deploy Frontend to Netlify:"
echo "   - Go to https://netlify.com"
echo "   - Sign up with GitHub"
echo "   - New site from Git"
echo "   - Connect your repository"
echo "   - Base directory: frontend"
echo "   - Build command: npm run build"
echo "   - Publish directory: build"
echo ""
echo "5. Set Environment Variables:"
echo "   - In Netlify: REACT_APP_API_URL=https://your-backend-app.onrender.com/api"
echo "   - In Render: CORS_ORIGIN=https://your-frontend-app.netlify.app"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
echo ""
echo "🎉 Happy deploying!" 