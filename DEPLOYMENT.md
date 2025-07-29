# 🚀 Deployment Guide

This guide will help you deploy the Stock Dashboard to Render (backend) and Netlify (frontend).

## 📋 Prerequisites

- GitHub account
- Render.com account (free)
- Netlify account (free)
- Git installed on your computer

## 🔧 Step 1: Prepare Your Repository

### 1.1 Initialize Git Repository
```bash
cd stock-dashboard
git init
git add .
git commit -m "Initial commit: Stock Dashboard with backend and frontend"
```

### 1.2 Create GitHub Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name it: `stock-dashboard`
4. Make it **Public** (required for free deployment)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 1.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/stock-dashboard.git
git branch -M main
git push -u origin main
```

## 🌐 Step 2: Deploy Backend to Render

### 2.1 Create Render Account
1. Go to [Render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email

### 2.2 Deploy Backend Service
1. In Render dashboard, click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

```
Name: stock-dashboard-backend
Root Directory: backend
Environment: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

### 2.3 Set Environment Variables
In the Render dashboard, go to **Environment** tab and add:

```
NODE_ENV=production
PORT=10000
CORS_ORIGIN=https://your-frontend-app.netlify.app
```

### 2.4 Deploy
1. Click **"Create Web Service"**
2. Wait for deployment (2-3 minutes)
3. Note your backend URL: `https://your-app-name.onrender.com`

## 🎨 Step 3: Deploy Frontend to Netlify

### 3.1 Create Netlify Account
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with your GitHub account

### 3.2 Deploy Frontend
1. In Netlify dashboard, click **"New site from Git"**
2. Choose **GitHub**
3. Select your `stock-dashboard` repository
4. Configure build settings:

```
Base directory: frontend
Build command: npm run build
Publish directory: build
Branch: main
```

### 3.3 Set Environment Variables
In Netlify dashboard, go to **Site settings** → **Environment variables** and add:

```
REACT_APP_API_URL=https://your-backend-app.onrender.com/api
```

**Replace `your-backend-app` with your actual Render app name.**

### 3.4 Deploy
1. Click **"Deploy site"**
2. Wait for build and deployment (2-3 minutes)
3. Your site will be available at: `https://random-name.netlify.app`

## 🔗 Step 4: Connect Frontend to Backend

### 4.1 Update CORS Origin
1. Go back to Render dashboard
2. Update the `CORS_ORIGIN` environment variable with your Netlify URL:
```
CORS_ORIGIN=https://your-netlify-app.netlify.app
```

### 4.2 Redeploy Backend
1. In Render dashboard, click **"Manual Deploy"**
2. Select **"Clear build cache & deploy"**

## ✅ Step 5: Test Your Deployment

### 5.1 Test Backend API
Visit: `https://your-backend-app.onrender.com/api/health`
Should return: `{"status":"OK","message":"Stock Dashboard API is running"}`

### 5.2 Test Frontend
Visit your Netlify URL and verify:
- Market indices are loading
- Stock search works
- Watchlist displays data
- No CORS errors in browser console

## 🔧 Troubleshooting

### Common Issues

#### 1. CORS Errors
- Ensure `CORS_ORIGIN` in Render matches your Netlify URL exactly
- Check that the backend URL in Netlify environment variables is correct

#### 2. Build Failures
- Check that all dependencies are in `package.json`
- Verify Node.js version compatibility (>=16.0.0)

#### 3. API Not Responding
- Check Render logs for errors
- Verify the backend is deployed and running
- Test the health endpoint

#### 4. Frontend Not Loading Data
- Check browser console for errors
- Verify `REACT_APP_API_URL` environment variable in Netlify
- Ensure backend URL is accessible

### Debug Commands

#### Check Backend Logs
1. Go to Render dashboard
2. Click on your backend service
3. Go to **Logs** tab
4. Look for error messages

#### Check Frontend Build Logs
1. Go to Netlify dashboard
2. Click on your site
3. Go to **Deploys** tab
4. Click on latest deploy
5. Check build logs

## 🔄 Continuous Deployment

Both Render and Netlify will automatically redeploy when you push changes to your GitHub repository:

```bash
# Make changes to your code
git add .
git commit -m "Update stock dashboard"
git push origin main
```

## 📊 Monitoring

### Render Monitoring
- **Uptime**: Check service status in dashboard
- **Logs**: Monitor application logs
- **Performance**: Track response times

### Netlify Monitoring
- **Build Status**: Check deployment status
- **Analytics**: View site performance
- **Forms**: Monitor form submissions (if any)

## 🔒 Security Notes

- Keep your GitHub repository public for free deployment
- Environment variables are encrypted in both platforms
- CORS is properly configured for security
- API endpoints are rate-limited by NSE

## 📱 Custom Domain (Optional)

### Netlify Custom Domain
1. Go to **Domain settings** in Netlify
2. Click **"Add custom domain"**
3. Follow DNS configuration instructions

### Render Custom Domain
1. Go to **Settings** in Render
2. Click **"Custom Domains"**
3. Add your domain and configure DNS

## 🎉 Success!

Your Stock Dashboard is now live at:
- **Frontend**: `https://your-app.netlify.app`
- **Backend API**: `https://your-app.onrender.com`

The app will automatically update when you push changes to GitHub!

---

**Need help?** Check the troubleshooting section or create an issue in your GitHub repository. 