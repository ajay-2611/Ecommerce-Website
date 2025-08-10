import React, { useState } from "react";
import { FaBars, FaSearch, FaShoppingBag, FaShoppingCart, FaSignOutAlt, FaTimes, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

// Import logo image
import logo from "../assets/images/logo.png";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { isAuthenticated, user, logout } = useAuth();
    const { cartCount } = useCart();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // TODO: Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    const linkStyle = {
        color: "#fff",
        textDecoration: "none",
        padding: "10px 16px",
        borderRadius: "6px",
        transition: "all 0.3s ease",
        fontWeight: "500",
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "8px"
    };

    const hoverStyle = {
        backgroundColor: "rgba(255, 255, 255, 0.1)"
    };

    return (
        <header style={{ 
            padding: "0",
            backgroundColor: "#1a1a1a",
            color: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
        }}>
            {/* Top Bar */}
            <div style={{
                backgroundColor: "#007bff",
                padding: "8px 0",
                textAlign: "center",
                fontSize: "0.9rem"
            }}>
                <span>🎉 Free Shipping on Orders Above ₹500! Limited Time Offer</span>
            </div>

            {/* Main Header */}
            <div style={{
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 0"
                }}>
                    {/* Logo */}
                    <Link to="/" style={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "none",
                        color: "#fff"
                    }}>
                        <img 
                            src={logo} 
                            alt="Shopify Logo" 
                            style={{
                                height: "40px",
                                marginRight: "12px"
                            }}
                        />
                        <span style={{
                            fontSize: "1.8rem",
                            fontWeight: "700",
                            letterSpacing: "1px",
                            fontFamily: "'Poppins', sans-serif"
                        }}>
                            Shopify
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <div style={{
                        flex: 1,
                        maxWidth: "500px",
                        margin: "0 2rem"
                    }}>
                        <form onSubmit={handleSearch} style={{
                            display: "flex",
                            position: "relative"
                        }}>
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "12px 50px 12px 16px",
                                    border: "2px solid #e9ecef",
                                    borderRadius: "25px",
                                    fontSize: "1rem",
                                    outline: "none",
                                    backgroundColor: "#fff",
                                    color: "#333"
                                }}
                            />
                            <button
                                type="submit"
                                style={{
                                    position: "absolute",
                                    right: "8px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    backgroundColor: "#007bff",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "50%",
                                    width: "36px",
                                    height: "36px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    transition: "background-color 0.3s ease"
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.backgroundColor = "#0056b3";
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.backgroundColor = "#007bff";
                                }}
                            >
                                <FaSearch size={16} />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <nav style={{ 
                        display: "flex", 
                        alignItems: "center",
                        gap: "10px"
                    }}>
                        {/* Cart Link */}
                        <Link to="/cart" style={{
                            ...linkStyle,
                            backgroundColor: "#007bff",
                            padding: "12px 20px",
                            position: "relative"
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}>
                            <FaShoppingCart size={18} />
                            <span style={{ display: { xs: "none", sm: "inline" } }}>
                                Cart ({cartCount})
                            </span>
                            {cartCount > 0 && (
                                <span style={{
                                    position: "absolute",
                                    top: "-8px",
                                    right: "-8px",
                                    backgroundColor: "#dc3545",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: "20px",
                                    height: "20px",
                                    fontSize: "0.75rem",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "600"
                                }}>
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <>
                                {/* My Orders Link */}
                                <Link to="/orders" style={linkStyle}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                    <FaShoppingBag size={16} />
                                    My Orders
                                </Link>

                                {/* User Menu */}
                                <div style={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center"
                                }}>
                                    <button style={{
                                        ...linkStyle,
                                        backgroundColor: "transparent",
                                        border: "none",
                                        cursor: "pointer"
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                        <FaUser size={16} />
                                        {user?.name || 'User'}
                                    </button>
                                </div>

                                {/* Logout Button */}
                                <button onClick={logout} style={{
                                    ...linkStyle,
                                    backgroundColor: "#dc3545",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#c82333")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#dc3545")}>
                                    <FaSignOutAlt size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                {/* Login Button */}
                                <Link to="/login" style={linkStyle}
                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor)}
                                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}>
                                    <FaUser size={16} />
                                    Login
                                </Link>

                                {/* Signup Button */}
                                <Link to="/signup" style={{
                                    ...linkStyle,
                                    backgroundColor: "#28a745",
                                    padding: "12px 20px"
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#218838")}
                                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#28a745")}>
                                    Sign Up
                                </Link>
                            </>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMenu}
                            style={{
                                display: "none",
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#fff",
                                fontSize: "1.5rem",
                                cursor: "pointer",
                                padding: "8px"
                            }}
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </nav>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div style={{
                        backgroundColor: "#2a2a2a",
                        padding: "1rem",
                        borderRadius: "8px",
                        marginBottom: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}>
                        <Link to="/cart" style={{
                            ...linkStyle,
                            backgroundColor: "#007bff",
                            justifyContent: "center"
                        }}>
                            <FaShoppingCart size={18} />
                            Cart ({cartCount})
                        </Link>
                        
                        {isAuthenticated ? (
                            <>
                                <Link to="/orders" style={{
                                    ...linkStyle,
                                    justifyContent: "center"
                                }}>
                                    <FaShoppingBag size={16} />
                                    My Orders
                                </Link>
                                <div style={{
                                    ...linkStyle,
                                    justifyContent: "center",
                                    backgroundColor: "#333"
                                }}>
                                    <FaUser size={16} />
                                    {user?.name || 'User'}
                                </div>
                                <button onClick={logout} style={{
                                    ...linkStyle,
                                    backgroundColor: "#dc3545",
                                    justifyContent: "center",
                                    border: "none",
                                    cursor: "pointer"
                                }}>
                                    <FaSignOutAlt size={16} />
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" style={{
                                    ...linkStyle,
                                    justifyContent: "center"
                                }}>
                                    <FaUser size={16} />
                                    Login
                                </Link>
                                <Link to="/signup" style={{
                                    ...linkStyle,
                                    backgroundColor: "#28a745",
                                    justifyContent: "center"
                                }}>
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>

            {/* Category Navigation */}
            <div style={{
                backgroundColor: "#2a2a2a",
                borderTop: "1px solid #404040"
            }}>
                <div style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "0 20px"
                }}>
                    <nav style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0",
                        overflowX: "auto",
                        padding: "0.5rem 0"
                    }}>
                        <Link to="/" 
                            onClick={() => {
                                // This will be handled by the HomeScreen component
                                // The component will detect the navigation and reset filters
                            }}
                            style={{
                                ...linkStyle,
                                padding: "12px 20px",
                                borderBottom: "3px solid transparent",
                                borderRadius: "0"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                                e.currentTarget.style.borderBottomColor = "#007bff";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.borderBottomColor = "transparent";
                            }}>
                            All Products
                        </Link>
                        <Link to="/?category=men" style={{
                            ...linkStyle,
                            padding: "12px 20px",
                            borderBottom: "3px solid transparent",
                            borderRadius: "0"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.borderBottomColor = "#007bff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderBottomColor = "transparent";
                        }}>
                            Men's Fashion
                        </Link>
                        <Link to="/?category=women" style={{
                            ...linkStyle,
                            padding: "12px 20px",
                            borderBottom: "3px solid transparent",
                            borderRadius: "0"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.borderBottomColor = "#007bff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderBottomColor = "transparent";
                        }}>
                            Women's Fashion
                        </Link>
                        <Link to="/?category=kid" style={{
                            ...linkStyle,
                            padding: "12px 20px",
                            borderBottom: "3px solid transparent",
                            borderRadius: "0"
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                            e.currentTarget.style.borderBottomColor = "#007bff";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderBottomColor = "transparent";
                        }}>
                            Kids' Fashion
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;