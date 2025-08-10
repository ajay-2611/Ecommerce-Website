import React, { useState } from "react";
import { FaArrowLeft, FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartScreen = () => {
    const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + ((item.price || item.new_price) * item.quantity), 0);
    };

    const calculateTotal = () => {
        const subtotal = calculateSubtotal();
        const shipping = subtotal > 500 ? 0 : 50;
        const tax = subtotal * 0.18; // 18% GST
        return subtotal + shipping + tax;
    };

    const handleCheckout = async () => {
        setIsLoading(true);
        // Navigate to checkout with cart items
        setTimeout(() => {
            setIsLoading(false);
            navigate('/checkout', { state: { cartItems, isFromCart: true } });
        }, 500);
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ 
                maxWidth: "800px", 
                margin: "0 auto", 
                padding: "40px 20px",
                textAlign: "center",
                fontFamily: "'Poppins', sans-serif"
            }}>
                {/* Empty Cart Icon */}
                <div style={{
                    fontSize: "6rem",
                    color: "#e9ecef",
                    marginBottom: "2rem"
                }}>
                    🛒
                </div>

                <h1 style={{ 
                    fontSize: "2.5rem", 
                    fontWeight: "700", 
                    marginBottom: "1rem",
                    color: "#333"
                }}>
                    Your Cart is Empty
                </h1>

                <p style={{ 
                    fontSize: "1.2rem", 
                    color: "#666",
                    marginBottom: "3rem",
                    lineHeight: "1.6"
                }}>
                    Looks like you haven't added any items to your cart yet. 
                    Start shopping to discover amazing products!
                </p>

                {/* Action Buttons */}
                <div style={{
                    display: "flex",
                    gap: "20px",
                    justifyContent: "center",
                    flexWrap: "wrap"
                }}>
                    <Link to="/" style={{
                        padding: "15px 30px",
                        backgroundColor: "#007bff",
                        color: "white",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        transition: "all 0.3s ease",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#0056b3";
                        e.target.style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.transform = "translateY(0)";
                    }}>
                        <FaShoppingCart size={18} />
                        Start Shopping
                    </Link>

                    <Link to="/?category=women" style={{
                        padding: "15px 30px",
                        backgroundColor: "white",
                        color: "#007bff",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        border: "2px solid #007bff",
                        transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "#007bff";
                    }}>
                        Women's Fashion
                    </Link>

                    <Link to="/?category=men" style={{
                        padding: "15px 30px",
                        backgroundColor: "white",
                        color: "#007bff",
                        textDecoration: "none",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                        border: "2px solid #007bff",
                        transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "#007bff";
                        e.target.style.color = "white";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "white";
                        e.target.style.color = "#007bff";
                    }}>
                        Men's Fashion
                    </Link>
                </div>

                {/* Features */}
                <div style={{
                    marginTop: "4rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "2rem",
                    textAlign: "left"
                }}>
                    <div style={{
                        padding: "1.5rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef"
                    }}>
                        <div style={{
                            fontSize: "2rem",
                            marginBottom: "1rem",
                            color: "#007bff"
                        }}>
                            🚚
                        </div>
                        <h3 style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            marginBottom: "0.5rem",
                            color: "#333"
                        }}>
                            Free Shipping
                        </h3>
                        <p style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            lineHeight: "1.5"
                        }}>
                            Free shipping on orders above ₹500. Fast delivery across India.
                        </p>
                    </div>

                    <div style={{
                        padding: "1.5rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef"
                    }}>
                        <div style={{
                            fontSize: "2rem",
                            marginBottom: "1rem",
                            color: "#28a745"
                        }}>
                            🛡️
                        </div>
                        <h3 style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            marginBottom: "0.5rem",
                            color: "#333"
                        }}>
                            Secure Payment
                        </h3>
                        <p style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            lineHeight: "1.5"
                        }}>
                            Multiple payment options with secure encryption. Your data is safe.
                        </p>
                    </div>

                    <div style={{
                        padding: "1.5rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "12px",
                        border: "1px solid #e9ecef"
                    }}>
                        <div style={{
                            fontSize: "2rem",
                            marginBottom: "1rem",
                            color: "#ffc107"
                        }}>
                            🔄
                        </div>
                        <h3 style={{
                            fontSize: "1.2rem",
                            fontWeight: "600",
                            marginBottom: "0.5rem",
                            color: "#333"
                        }}>
                            Easy Returns
                        </h3>
                        <p style={{
                            color: "#666",
                            fontSize: "0.9rem",
                            lineHeight: "1.5"
                        }}>
                            30-day return policy. No questions asked returns for your convenience.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ 
            maxWidth: "1200px", 
            margin: "0 auto", 
            padding: "20px",
            fontFamily: "'Poppins', sans-serif"
        }}>
            {/* Header */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem",
                paddingBottom: "1rem",
                borderBottom: "2px solid #f0f0f0"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px"
                }}>
                    <Link to="/" style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        textDecoration: "none",
                        color: "#007bff",
                        fontSize: "1rem",
                        fontWeight: "500"
                    }}>
                        <FaArrowLeft size={16} />
                        Continue Shopping
                    </Link>
                </div>

                <h1 style={{
                    fontSize: "2.5rem",
                    fontWeight: "700",
                    color: "#333",
                    margin: 0
                }}>
                    Shopping Cart
                </h1>

                <div style={{
                    fontSize: "1.1rem",
                    color: "#666"
                }}>
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </div>
            </div>

            {/* Cart Content */}
            <div style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "2rem"
            }}>
                {/* Cart Items */}
                <div>
                    <h2 style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginBottom: "1.5rem",
                        color: "#333"
                    }}>
                        Cart Items
                    </h2>

                    {cartItems.map((item) => (
                        <div key={item.id} style={{
                            border: "1px solid #f0f0f0",
                            borderRadius: "12px",
                            padding: "1.5rem",
                            marginBottom: "1rem",
                            backgroundColor: "white",
                            display: "flex",
                            gap: "1.5rem",
                            alignItems: "center"
                        }}>
                            {/* Product Image */}
                            <img 
                                src={item.image} 
                                alt={item.name}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                    borderRadius: "8px"
                                }}
                            />

                            {/* Product Details */}
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    marginBottom: "0.5rem",
                                    color: "#333"
                                }}>
                                    {item.name}
                                </h3>
                                <p style={{
                                    color: "#666",
                                    fontSize: "0.9rem",
                                    marginBottom: "0.5rem"
                                }}>
                                    Category: {item.category}
                                </p>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "15px"
                                }}>
                                    <span style={{
                                        fontSize: "1.2rem",
                                        fontWeight: "700",
                                        color: "#007bff"
                                    }}>
                                        ₹{item.new_price}
                                    </span>
                                    {item.old_price && (
                                        <span style={{
                                            fontSize: "1rem",
                                            color: "#999",
                                            textDecoration: "line-through"
                                        }}>
                                            ₹{item.old_price}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Quantity Controls */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "10px"
                            }}>
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    border: "2px solid #e9ecef",
                                    borderRadius: "8px",
                                    overflow: "hidden"
                                }}>
                                    <button 
                                        style={{
                                            padding: "8px 12px",
                                            border: "none",
                                            backgroundColor: "#f8f9fa",
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <span style={{
                                        padding: "8px 16px",
                                        borderLeft: "1px solid #e9ecef",
                                        borderRight: "1px solid #e9ecef",
                                        backgroundColor: "white",
                                        fontSize: "1rem",
                                        fontWeight: "600",
                                        minWidth: "50px",
                                        textAlign: "center"
                                    }}>
                                        {item.quantity}
                                    </span>
                                    <button 
                                        style={{
                                            padding: "8px 12px",
                                            border: "none",
                                            backgroundColor: "#f8f9fa",
                                            cursor: "pointer",
                                            fontSize: "1rem",
                                            fontWeight: "600"
                                        }}
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                                <span style={{
                                    fontSize: "0.9rem",
                                    color: "#666"
                                }}>
                                    Qty: {item.quantity}
                                </span>
                            </div>

                            {/* Actions */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px"
                            }}>
                                <button style={{
                                    padding: "8px 12px",
                                    backgroundColor: "white",
                                    color: "#dc3545",
                                    border: "2px solid #dc3545",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}
                                onClick={() => removeFromCart(item.id)}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#dc3545";
                                    e.target.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "white";
                                    e.target.style.color = "#dc3545";
                                }}>
                                    <FaTrash size={14} />
                                    Remove
                                </button>

                                <button style={{
                                    padding: "8px 12px",
                                    backgroundColor: "white",
                                    color: "#007bff",
                                    border: "2px solid #007bff",
                                    borderRadius: "6px",
                                    cursor: "pointer",
                                    fontSize: "0.9rem",
                                    fontWeight: "600",
                                    transition: "all 0.3s ease",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "6px"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#007bff";
                                    e.target.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "white";
                                    e.target.style.color = "#007bff";
                                }}>
                                    <FaHeart size={14} />
                                    Wishlist
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div style={{
                    backgroundColor: "#f8f9fa",
                    padding: "2rem",
                    borderRadius: "12px",
                    border: "1px solid #e9ecef",
                    height: "fit-content",
                    position: "sticky",
                    top: "100px"
                }}>
                    <h2 style={{
                        fontSize: "1.5rem",
                        fontWeight: "600",
                        marginBottom: "1.5rem",
                        color: "#333"
                    }}>
                        Order Summary
                    </h2>

                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        marginBottom: "2rem"
                    }}>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "1rem"
                        }}>
                            <span>Subtotal ({cartItems.length} items)</span>
                            <span>₹{calculateSubtotal().toFixed(2)}</span>
                        </div>
                        
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "1rem"
                        }}>
                            <span>Shipping</span>
                            <span style={{ color: calculateSubtotal() > 500 ? "#28a745" : "#666" }}>
                                {calculateSubtotal() > 500 ? "FREE" : "₹50.00"}
                            </span>
                        </div>
                        
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "1rem"
                        }}>
                            <span>Tax (GST 18%)</span>
                            <span>₹{(calculateSubtotal() * 0.18).toFixed(2)}</span>
                        </div>

                        <hr style={{ border: "1px solid #e9ecef", margin: "15px 0" }} />
                        
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "1.2rem",
                            fontWeight: "700",
                            color: "#333"
                        }}>
                            <span>Total</span>
                            <span>₹{calculateTotal().toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Promo Code */}
                    <div style={{ marginBottom: "2rem" }}>
                        <input 
                            type="text"
                            placeholder="Enter promo code"
                            style={{
                                width: "100%",
                                padding: "12px 16px",
                                border: "2px solid #e9ecef",
                                borderRadius: "8px",
                                fontSize: "1rem",
                                outline: "none"
                            }}
                        />
                    </div>

                    {/* Checkout Button */}
                    <button 
                        onClick={handleCheckout}
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
                            transition: "all 0.3s ease"
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = "#218838";
                            e.target.style.transform = "translateY(-2px)";
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = "#28a745";
                            e.target.style.transform = "translateY(0)";
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? "Processing..." : "Proceed to Checkout"}
                    </button>

                    {/* Additional Info */}
                    <div style={{
                        marginTop: "1.5rem",
                        padding: "1rem",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        border: "1px solid #e9ecef"
                    }}>
                        <p style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            margin: "0 0 0.5rem 0"
                        }}>
                            🚚 Free shipping on orders above ₹500
                        </p>
                        <p style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            margin: "0 0 0.5rem 0"
                        }}>
                            🔒 Secure payment with SSL encryption
                        </p>
                        <p style={{
                            fontSize: "0.9rem",
                            color: "#666",
                            margin: 0
                        }}>
                            🔄 30-day return policy
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartScreen;