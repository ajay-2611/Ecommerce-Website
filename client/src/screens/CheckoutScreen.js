import React, { useEffect, useMemo, useState } from "react";
import { FaArrowLeft, FaCreditCard, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const CheckoutScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    
    const product = location.state?.product;
    const cartItems = location.state?.cartItems;
    const isFromCart = location.state?.isFromCart;
    
    // Determine what we're checking out
    const itemsToCheckout = useMemo(() => {
        return isFromCart ? cartItems : (product ? [product] : []);
    }, [isFromCart, cartItems, product]);
    
    const [formData, setFormData] = useState({
        fullName: user?.name || '',
        email: user?.email || '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        
        if (itemsToCheckout.length === 0) {
            navigate('/');
            return;
        }
    }, [isAuthenticated, itemsToCheckout, navigate]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const calculateTotal = () => {
        if (itemsToCheckout.length === 0) return 0;
        const subtotal = itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0);
        const shipping = subtotal > 500 ? 0 : 50;
        const tax = subtotal * 0.18;
        return subtotal + shipping + tax;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Prepare order data
            const orderData = {
                orderItems: itemsToCheckout.map(item => ({
                    name: item.name,
                    qty: item.quantity || 1,
                    image: item.image,
                    price: item.price || item.new_price,
                    product: item.id
                })),
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.zipCode,
                    country: 'India'
                },
                paymentMethod: 'Credit Card',
                paymentResult: {
                    id: 'mock_payment_id',
                    status: 'completed',
                    update_time: new Date().toISOString()
                },
                itemsPrice: itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0),
                taxPrice: itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0) * 0.18,
                shippingPrice: itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0) > 500 ? 0 : 50,
                totalPrice: calculateTotal()
            };

            // In a real app, you would send this to your backend API
            // const response = await api.post('/api/orders', orderData);
            
            // For now, simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Clear cart and redirect
            alert('Order placed successfully! Thank you for your purchase.');
            navigate('/orders');
            
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    if (itemsToCheckout.length === 0) return null;

    return (
        <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f8f9fa", minHeight: "100vh", padding: "20px" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "2rem" }}>
                    <Link to="/" style={{ display: "flex", alignItems: "center", gap: "8px", color: "#007bff", textDecoration: "none", fontSize: "1.1rem", fontWeight: "600" }}>
                        <FaArrowLeft size={16} />
                        Back to Shopping
                    </Link>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "2rem" }}>
                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
                        <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "2rem", color: "#333" }}>Checkout</h1>

                        <form onSubmit={handleSubmit}>
                            <div style={{ marginBottom: "2rem" }}>
                                <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#333" }}>Personal Information</h3>
                                
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>
                                            <FaUser size={14} style={{ marginRight: "8px" }} />
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>
                                            <FaEnvelope size={14} style={{ marginRight: "8px" }} />
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>
                                        <FaPhone size={14} style={{ marginRight: "8px" }} />
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                        style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                    />
                                </div>
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#333" }}>
                                    <FaMapMarkerAlt size={16} style={{ marginRight: "8px" }} />
                                    Shipping Address
                                </h3>
                                
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                    />
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>State</label>
                                        <input
                                            type="text"
                                            name="state"
                                            value={formData.state}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>ZIP Code</label>
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div style={{ marginBottom: "2rem" }}>
                                <h3 style={{ fontSize: "1.3rem", fontWeight: "600", marginBottom: "1rem", color: "#333" }}>
                                    <FaCreditCard size={16} style={{ marginRight: "8px" }} />
                                    Payment Information
                                </h3>
                                
                                <div style={{ marginBottom: "1rem" }}>
                                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>Card Number</label>
                                    <input
                                        type="text"
                                        name="cardNumber"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        placeholder="1234 5678 9012 3456"
                                        required
                                        style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                    />
                                </div>

                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>Expiry Date</label>
                                        <input
                                            type="text"
                                            name="expiryDate"
                                            value={formData.expiryDate}
                                            onChange={handleInputChange}
                                            placeholder="MM/YY"
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>CVV</label>
                                        <input
                                            type="text"
                                            name="cvv"
                                            value={formData.cvv}
                                            onChange={handleInputChange}
                                            placeholder="123"
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "600", color: "#555" }}>Cardholder Name</label>
                                        <input
                                            type="text"
                                            name="cardholderName"
                                            value={formData.cardholderName}
                                            onChange={handleInputChange}
                                            required
                                            style={{ width: "100%", padding: "12px", border: "2px solid #e9ecef", borderRadius: "8px", fontSize: "1rem", outline: "none" }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                style={{
                                    width: "100%",
                                    padding: "16px",
                                    backgroundColor: "#28a745",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "8px",
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    opacity: isLoading ? 0.7 : 1
                                }}
                            >
                                {isLoading ? "Processing Order..." : `Place Order - ₹${calculateTotal().toFixed(2)}`}
                            </button>
                        </form>
                    </div>

                    <div style={{ backgroundColor: "white", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", height: "fit-content" }}>
                        <h3 style={{ fontSize: "1.5rem", fontWeight: "700", marginBottom: "1.5rem", color: "#333" }}>Order Summary</h3>

                        {itemsToCheckout.map((item, index) => (
                            <div key={index} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", paddingBottom: "1rem", borderBottom: index < itemsToCheckout.length - 1 ? "1px solid #e9ecef" : "none" }}>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                                />
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "0.5rem", color: "#333" }}>{item.name}</h4>
                                    <p style={{ color: "#666", marginBottom: "0.5rem" }}>{item.category}</p>
                                    <p style={{ fontSize: "1.2rem", fontWeight: "700", color: "#28a745" }}>₹{(item.price || item.new_price) * (item.quantity || 1)}</p>
                                    <p style={{ fontSize: "0.9rem", color: "#666" }}>Qty: {item.quantity || 1}</p>
                                </div>
                            </div>
                        ))}

                        <div style={{ marginBottom: "1.5rem" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span>Subtotal</span>
                                <span>₹{itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0).toFixed(2)}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span>Shipping</span>
                                <span>{itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0) > 500 ? "Free" : "₹50"}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                                <span>Tax (GST 18%)</span>
                                <span>₹{(itemsToCheckout.reduce((sum, item) => sum + ((item.price || item.new_price) * (item.quantity || 1)), 0) * 0.18).toFixed(2)}</span>
                            </div>
                            <hr style={{ border: "1px solid #e9ecef", margin: "1rem 0" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", fontWeight: "700", color: "#333" }}>
                                <span>Total</span>
                                <span>₹{calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ padding: "1rem", backgroundColor: "#f8f9fa", borderRadius: "8px", border: "1px solid #e9ecef" }}>
                            <p style={{ fontSize: "0.9rem", color: "#666", margin: "0 0 0.5rem 0", display: "flex", alignItems: "center", gap: "8px" }}>
                                <FaLock size={14} />
                                Secure payment with SSL encryption
                            </p>
                            <p style={{ fontSize: "0.9rem", color: "#666", margin: 0 }}>
                                Your payment information is encrypted and secure
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutScreen;
