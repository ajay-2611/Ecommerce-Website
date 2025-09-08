# MERN E-commerce Application
Deployment Link:https://ecommerce-website-1-mcmm.onrender.com/
A full-stack e-commerce application built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

- **User Authentication**: Signup, login, and JWT-based authentication
- **Product Management**: Browse products by category, view product details
- **Shopping Cart**: Add/remove items, manage cart state
- **Order Management**: Place orders and track order history
- **Responsive Design**: Modern UI with mobile-friendly interface
- **Category Filtering**: Filter products by Men, Women, Kids, or All categories

## Tech Stack

### Frontend
- React.js 19.1.1
- React Router DOM 7.8.0
- Axios for API calls
- React Icons for UI icons
- CSS-in-JS styling

### Backend
- Node.js with Express.js
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- Multer for file uploads
- CORS enabled

## Project Structure

```
mern-ecommerce/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── screens/       # Page components
│   │   └── App.js         # Main app component
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Custom middleware
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   └── server.js          # Main server file
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mern-ecommerce
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the server directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/mern-ecommerce
   JWT_SECRET=your_jwt_secret_key_here
   PORT=5000
   NODE_ENV=development
   ```

5. **Start the backend server**
   ```bash
   cd ../server
   npm run dev
   ```

6. **Start the frontend application**
   ```bash
   cd ../client
   npm start
   ```

The application will be available at:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## Deployment

### Quick Deploy to Render

1. **Prepare for deployment**:
   ```bash
   # Windows
   deploy.bat
   
   # Linux/Mac
   ./deploy.sh
   ```

2. **Push to GitHub** and connect to Render

3. **Set environment variables** in Render dashboard:
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong secret key
   - `NODE_ENV`: `production`

4. **Deploy!** Your app will be available at your Render URL

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

## API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user orders

## Features in Detail

### Home Screen
- Displays all products in a responsive grid
- Category filtering (All, Men, Women, Kids)
- Product cards with image, name, price, and stock status

### Product Screen
- Detailed product view
- Add to cart functionality
- Product information and images

### Cart Screen
- Shopping cart management
- Quantity adjustments
- Order placement

### Authentication
- Secure user registration and login
- JWT token-based authentication
- Protected routes for authenticated users

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Support

For support and questions, please open an issue in the repository.
