# Setup Guide for MERN E-commerce

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd mern-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm run install-all
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the `server` directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/mern-ecommerce
   JWT_SECRET=your_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

## Manual Setup

### Backend Setup
```bash
cd server
npm install
# Create .env file with your configuration
npm run dev
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

## Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/mern-ecommerce`

### Option 2: MongoDB Atlas
1. Create account at [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a cluster
3. Get connection string and add to `.env` file
4. Example: `mongodb+srv://username:password@cluster.mongodb.net/mern-ecommerce`

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change PORT in `.env` file
   - Kill process using the port

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify connection string in `.env`
   - Check network/firewall settings

3. **CORS errors**
   - Ensure backend is running on correct port
   - Check proxy configuration in client/package.json

### Getting Help

- Check the console for error messages
- Verify all environment variables are set
- Ensure MongoDB is accessible
- Check if all dependencies are installed
