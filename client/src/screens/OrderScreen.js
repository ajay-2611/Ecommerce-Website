import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCalendar, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const OrderScreen = () => {
    const { isAuthenticated } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading orders from API
        // In a real app, you would fetch from your backend
        setTimeout(() => {
            // Mock orders data - replace with actual API call
            const mockOrders = [
                {
                    id: "ORD001",
                    date: "2024-01-15",
                    status: "Delivered",
                    total: 1250.00,
                    items: [
                        { id: 1, name: "Striped Flutter Sleeve Blouse", quantity: 2, price: 500.00, image: "product_1.png" },
                        { id: 5, name: "Elegant Striped Blouse", quantity: 1, price: 250.00, image: "product_5.png" }
                    ],
                    shippingAddress: "123 Fashion Street, Style City, SC 12345"
                },
                {
                    id: "ORD002",
                    date: "2024-01-10",
                    status: "In Transit",
                    total: 850.00,
                    items: [
                        { id: 15, name: "Classic Men's Shirt", quantity: 1, price: 850.00, image: "product_15.png" }
                    ],
                    shippingAddress: "123 Fashion Street, Style City, SC 12345"
                }
            ];
            setOrders(mockOrders);
            setLoading(false);
        }, 1000);
    }, []);

    if (!isAuthenticated) {
        return (
            <div style={{ 
                maxWidth: "800px", 
                margin: "0 auto", 
                padding: "40px 20px",
                textAlign: "center",
                fontFamily: "'Poppins', sans-serif"
            }}>
                <div style={{
                    fontSize: "6rem",
                    color: "#e9ecef",
                    marginBottom: "2rem"
                }}>
                    🔒
                </div>
                <h1 style={{ 
                    fontSize: "2.5rem", 
                    fontWeight: "700", 
                    marginBottom: "1rem",
                    color: "#333"
                }}>
                    Login Required
                </h1>
                <p style={{ 
                    fontSize: "1.2rem", 
                    color: "#666",
                    marginBottom: "3rem"
                }}>
                    Please log in to view your order history.
                </p>
                <Link to="/login" style={{
                    padding: "15px 30px",
                    backgroundColor: "#007bff",
                    color: "white",
                    textDecoration: "none",
                    borderRadius: "8px",
                    fontSize: "1.1rem",
                    fontWeight: "600",
                    transition: "all 0.3s ease"
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "#0056b3";
                    e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "#007bff";
                    e.target.style.transform = "translateY(0)";
                }}>
                    Login
                </Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center", 
                height: "50vh",
                fontSize: "1.2rem",
                color: "#666"
            }}>
                <div>Loading your orders...</div>
            </div>
        );
    }

    return (
        <div style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            padding: "40px 20px",
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                marginBottom: "3rem"
            }}>
                <Link to="/" style={{
                    color: "#007bff",
                    textDecoration: "none",
                    fontSize: "1.2rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                }}>
                    <FaArrowLeft size={16} />
                    Back to Home
                </Link>
                <h1 style={{ 
                    fontSize: "2.5rem", 
                    fontWeight: "700",
                    color: "#333",
                    margin: 0
                }}>
                    My Orders
                </h1>
            </div>

            {orders.length === 0 ? (
                <div style={{ 
                    textAlign: "center", 
                    padding: "4rem 2rem",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "15px"
                }}>
                    <div style={{
                        fontSize: "6rem",
                        color: "#e9ecef",
                        marginBottom: "2rem"
                    }}>
                        📦
                    </div>
                    <h2 style={{ 
                        fontSize: "2rem", 
                        fontWeight: "600",
                        marginBottom: "1rem",
                        color: "#333"
                    }}>
                        No Orders Yet
                    </h2>
                    <p style={{ 
                        fontSize: "1.1rem",
                        color: "#666",
                        marginBottom: "2rem"
                    }}>
                        You haven't placed any orders yet. Start shopping to see your order history here!
                    </p>
                    <Link to="/" style={{
                        padding: "15px 30px",
                        backgroundColor: "#007bff",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#0056b3";
                        e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.transform = "translateY(0)";
                    }}>
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem"
                }}>
                    {orders.map((order) => (
                        <div key={order.id} style={{
                            border: "1px solid #e9ecef",
                            borderRadius: "15px",
                            padding: "2rem",
                            backgroundColor: "white",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.08)"
                        }}>
                            {/* Order Header */}
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "1.5rem",
                                paddingBottom: "1rem",
                                borderBottom: "1px solid #e9ecef"
                            }}>
                                <div>
                                    <h3 style={{ 
                                        fontSize: "1.3rem",
                                        fontWeight: "600",
                                        margin: "0 0 0.5rem 0",
                                        color: "#333"
                                    }}>
                                        Order #{order.id}
                                    </h3>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px",
                                        color: "#666",
                                        fontSize: "0.9rem"
                                    }}>
                                        <FaCalendar size={14} />
                                        {new Date(order.date).toLocaleDateString()}
                                    </div>
                                </div>
                                <div style={{
                                    textAlign: "right"
                                }}>
                                    <div style={{
                                        padding: "8px 16px",
                                        backgroundColor: order.status === "Delivered" ? "#28a745" : "#ffc107",
                                        color: order.status === "Delivered" ? "white" : "#333",
                                        borderRadius: "20px",
                                        fontSize: "0.9rem",
                                        fontWeight: "600"
                                    }}>
                                        {order.status}
                                    </div>
                                    <div style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "700",
                                        color: "#333",
                                        marginTop: "0.5rem"
                                    }}>
                                        ₹{order.total.toFixed(2)}
                                    </div>
                                </div>
                            </div>

                            {/* Order Items */}
                            <div style={{
                                marginBottom: "1.5rem"
                            }}>
                                <h4 style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    margin: "0 0 1rem 0",
                                    color: "#333"
                                }}>
                                    Order Items
                                </h4>
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem"
                                }}>
                                    {order.items.map((item) => (
                                        <div key={item.id} style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "1rem",
                                            padding: "1rem",
                                            backgroundColor: "#f8f9fa",
                                            borderRadius: "8px"
                                        }}>
                                            <div style={{
                                                width: "60px",
                                                height: "60px",
                                                backgroundColor: "#e9ecef",
                                                borderRadius: "8px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                fontSize: "1.5rem",
                                                color: "#999"
                                            }}>
                                                👕
                                            </div>
                                            <div style={{
                                                flex: 1
                                            }}>
                                                <h5 style={{
                                                    fontSize: "1rem",
                                                    fontWeight: "600",
                                                    margin: "0 0 0.25rem 0",
                                                    color: "#333"
                                                }}>
                                                    {item.name}
                                                </h5>
                                                <div style={{
                                                    color: "#666",
                                                    fontSize: "0.9rem"
                                                }}>
                                                    Quantity: {item.quantity} × ₹{item.price.toFixed(2)}
                                                </div>
                                            </div>
                                            <div style={{
                                                fontSize: "1.1rem",
                                                fontWeight: "600",
                                                color: "#333"
                                            }}>
                                                ₹{(item.quantity * item.price).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Shipping Address */}
                            <div style={{
                                padding: "1rem",
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px"
                            }}>
                                <h4 style={{
                                    fontSize: "1rem",
                                    fontWeight: "600",
                                    margin: "0 0 0.5rem 0",
                                    color: "#333"
                                }}>
                                    Shipping Address
                                </h4>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                    color: "#666",
                                    fontSize: "0.9rem"
                                }}>
                                    <FaMapMarkerAlt size={14} />
                                    {order.shippingAddress}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderScreen;
