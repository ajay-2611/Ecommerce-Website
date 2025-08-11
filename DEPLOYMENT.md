# Deployment Guide for Render

## Prerequisites

1. **MongoDB Atlas Account**: Set up a free MongoDB Atlas cluster
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **GitHub Repository**: Push your code to GitHub

## Step 1: MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add your IP address to the IP whitelist (or use 0.0.0.0/0 for all IPs)

## Step 2: Render Deployment

### Option A: Deploy from GitHub (Recommended)

1. **Connect GitHub Repository**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure the Service**
   - **Name**: `ecommerce-website`
   - **Environment**: `Node`
   - **Build Command**: `cd server && npm install && npm run build`
   - **Start Command**: `cd server && npm start`
   - **Root Directory**: Leave empty (root of repository)

3. **Environment Variables**
   Add these in Render dashboard:
   ```
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/mern-ecommerce?retryWrites=true&w=majority
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   NODE_ENV=production
   PORT=5000
   ```

### Option B: Manual Deployment

1. **Build the Client**
   ```bash
   cd client
   npm install
   npm run build
   ```

2. **Deploy to Render**
   - Upload your code to Render
   - Set the same environment variables as above

## Step 3: Environment Configuration

### Server Environment Variables (.env)

Create a `.env` file in the `server` directory with:

```env
# MongoDB Connection String
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/mern-ecommerce?retryWrites=true&w=majority

# JWT Secret (use a strong secret!)
JWT_SECRET=your_super_secure_jwt_secret_key_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=production
```

## Step 4: Database Setup

1. **Run the Seeder** (if you have sample data):
   ```bash
   cd server
   npm run seeder
   ```

2. **Verify Database Connection**:
   - Check Render logs for successful MongoDB connection
   - Test API endpoints

## Step 5: Testing Deployment

1. **Test API Endpoints**:
   - `GET https://your-app.onrender.com/` - Should return "🚀 Server is running"
   - `GET https://your-app.onrender.com/api/products` - Should return products

2. **Test Frontend**:
   - Visit your app URL
   - Test user registration/login
   - Test product browsing
   - Test cart functionality

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check if all dependencies are in package.json
   - Verify Node.js version compatibility
   - Check build logs in Render dashboard

2. **Database Connection Issues**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in MongoDB Atlas
   - Ensure database user has correct permissions

3. **CORS Errors**
   - Verify CORS configuration in server.js
   - Check if frontend is making requests to correct URL

4. **Environment Variables**
   - Ensure all required env vars are set in Render
   - Check for typos in variable names
   - Verify JWT_SECRET is set

### Logs and Debugging

1. **View Render Logs**:
   - Go to your service in Render dashboard
   - Click on "Logs" tab
   - Check for error messages

2. **Test Locally**:
   ```bash
   # Test server
   cd server
   npm run dev
   
   # Test client
   cd client
   npm start
   ```

## Security Considerations

1. **JWT Secret**: Use a strong, random secret
2. **MongoDB**: Use strong passwords and limit IP access
3. **Environment Variables**: Never commit secrets to Git
4. **HTTPS**: Render provides HTTPS by default

## Performance Optimization

1. **Database Indexing**: Add indexes to frequently queried fields
2. **Caching**: Consider adding Redis for session storage
3. **CDN**: Use a CDN for static assets
4. **Compression**: Enable gzip compression

## Monitoring

1. **Render Metrics**: Monitor CPU, memory usage
2. **Database**: Monitor MongoDB Atlas metrics
3. **Logs**: Set up log aggregation
4. **Uptime**: Use uptime monitoring services

## Backup Strategy

1. **Database**: Enable MongoDB Atlas backups
2. **Code**: Use Git for version control
3. **Environment**: Document all environment variables
4. **Deployment**: Keep deployment scripts in repository
