import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import CartScreen from "./screens/CartScreen";
import CheckoutScreen from "./screens/CheckoutScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import OrderScreen from "./screens/OrderScreen";
import ProductScreen from "./screens/ProductScreen";
import SignupScreen from "./screens/SignupScreen";

const App = () => {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Header />
                    <Routes>
                        <Route path="/login" element={<LoginScreen />} />
                        <Route path="/signup" element={<SignupScreen />} />
                        <Route path="/" element={<HomeScreen />} />
                        <Route path="/product/:id" element={<ProductScreen />} />
                        <Route path="/cart" element={<CartScreen />} />
                        <Route path="/checkout" element={<CheckoutScreen />} />
                        <Route path="/orders" element={<OrderScreen />} />
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
};

export default App;